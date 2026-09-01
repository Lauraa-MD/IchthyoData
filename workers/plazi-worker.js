const PLAZI_STATS_URL =
    "https://tb.plazi.org/GgServer/srsStats/stats";

const PLAZI_SEARCH_URL =
    "https://tb.plazi.org/GgServer/search";

const PLAZI_FIELDS = [
    "tax.name",
    "tax.genusEpithet",
    "tax.speciesEpithet",
    "lnk.httpUri",
    "bibDsp.refDsp",
    "bib.title",
    "bib.year",
    "pubLnk.articleDoi",
    "matCit.id",
    "matCit.verbatimMatCit",
    "matCit.country",
    "matCit.region",
    "matCit.municipality",
    "matCit.location",
    "matCit.longitude",
    "matCit.latitude",
    "matCit.collectionCode",
    "matCit.specimenCode",
    "matCit.typeStatus",
    "matCit.gbifOccurrenceId"
];

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type"
};

function responderJSON(dados, status = 200) {
    return new Response(
        JSON.stringify(dados),
        {
            status: status,
            headers: {
                ...CORS_HEADERS,
                "Content-Type":
                    "application/json; charset=utf-8",
                "Cache-Control":
                    status === 200
                        ? "public, max-age=3600, s-maxage=86400"
                        : "no-store"
            }
        }
    );
}

function validarEpiteto(valor) {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/u.test(
        valor
    );
}

function montarFiltros(genero, especie) {
    return (
        `&FP-tax.genusEpithet=${encodeURIComponent(genero)}` +
        `&FP-tax.speciesEpithet=${encodeURIComponent(especie)}`
    );
}

function montarURLContagem(genero, especie) {
    return (
        `${PLAZI_STATS_URL}` +
        "?outputFields=matCit.id" +
        montarFiltros(genero, especie) +
        "&format=JSON"
    );
}

function montarURLRegistros(
    genero,
    especie,
    limite
) {
    const campos = PLAZI_FIELDS.join("+");

    return (
        `${PLAZI_STATS_URL}` +
        `?outputFields=${campos}` +
        `&groupingFields=${campos}` +
        montarFiltros(genero, especie) +
        `&limit=${limite}` +
        "&format=JSON"
    );
}

function montarURLTratamentos(genero, especie) {
    const url = new URL(PLAZI_SEARCH_URL);

    url.searchParams.set(
        "taxonomicName.taxonomicName",
        `${genero} ${especie}`
    );

    url.searchParams.set(
        "taxonomicName.isNomenclature",
        "true"
    );

    url.searchParams.set(
        "taxonomicName.exactMatch",
        "true"
    );

    return url.toString();
}

function esperar(milisegundos) {
    return new Promise(function (resolver) {
        setTimeout(resolver, milisegundos);
    });
}

async function consultarPlazi(url) {
    let ultimoErro = null;

    for (let tentativa = 1; tentativa <= 2; tentativa++) {
        const controlador = new AbortController();

        const temporizador = setTimeout(
            function () {
                controlador.abort();
            },
            25000
        );

        try {
            const resposta = await fetch(
                url,
                {
                    signal: controlador.signal,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            if (!resposta.ok) {
                throw new Error(
                    `Plazi respondeu HTTP ${resposta.status}`
                );
            }

            const texto = await resposta.text();

            return JSON.parse(texto);
        } catch (erro) {
            ultimoErro = erro;

            if (tentativa < 2) {
                await esperar(900);
            }
        } finally {
            clearTimeout(temporizador);
        }
    }

    throw ultimoErro ||
        new Error("Falha ao consultar o Plazi.");
}

async function consultarTratamentos(genero, especie) {
    const url = montarURLTratamentos(genero, especie);
    let ultimoErro = null;

    for (let tentativa = 1; tentativa <= 2; tentativa++) {
        const controlador = new AbortController();

        const temporizador = setTimeout(
            function () {
                controlador.abort();
            },
            35000
        );

        try {
            const resposta = await fetch(url, {
                signal: controlador.signal,
                headers: {
                    Accept: "text/html"
                }
            });

            if (!resposta.ok) {
                throw new Error(
                    `Busca de tratamentos respondeu HTTP ${resposta.status}`
                );
            }

            const html = await resposta.text();

            const texto = html
                .replace(/<[^>]*>/g, " ")
                .replace(/&nbsp;|&#160;/gi, " ")
                .replace(/\s+/g, " ");

            const correspondencia = texto.match(
                /Exact Match:\s*([\d.,]+)\s+Treatments?/i
            );

            const redirecionamentoUnico =
                /forwardToTreatment|We'll forward you/i
                    .test(html);

            const total = redirecionamentoUnico
                ? 1
                : correspondencia
                    ? Number(
                        correspondencia[1]
                            .replace(/\D/g, "")
                    )
                    : 0;

            return {
                total: Number.isFinite(total)
                    ? total
                    : 0,
                url: url
            };
        } catch (erro) {
            ultimoErro = erro;

            if (tentativa < 2) {
                await esperar(900);
            }
        } finally {
            clearTimeout(temporizador);
        }
    }

    throw ultimoErro ||
        new Error("Falha ao consultar os tratamentos do Plazi.");
}

async function atenderConsulta(requisicao) {
    const url = new URL(requisicao.url);

    const genero = String(
        url.searchParams.get("genus") || ""
    ).trim();

    const especie = String(
        url.searchParams.get("species") || ""
    ).trim();

    const limiteSolicitado = Number(
        url.searchParams.get("limit") || 300
    );

    const limite = Math.min(
        Math.max(
            Number.isFinite(limiteSolicitado)
                ? Math.floor(limiteSolicitado)
                : 300,
            1
        ),
        10000
    );

    if (
        !genero ||
        !especie ||
        !validarEpiteto(genero) ||
        !validarEpiteto(especie)
    ) {
        return responderJSON(
            {
                error:
                    "Informe genus e species como epítetos taxonômicos válidos."
            },
            400
        );
    }

    const chaveCache = new Request(
        `${url.origin}${url.pathname}` +
        `?genus=${encodeURIComponent(genero)}` +
        `&species=${encodeURIComponent(especie)}` +
        `&limit=${limite}` +
        "&responseVersion=3",
        { method: "GET" }
    );

    const cache = caches.default;
    const respostaEmCache =
        await cache.match(chaveCache);

    if (respostaEmCache) {
        return respostaEmCache;
    }

    // As duas consultas são sequenciais porque o servidor
    // do Plazi pode rejeitar requisições simultâneas.
    const dadosTratamentos =
        await consultarTratamentos(
            genero,
            especie
        );

    let dadosRegistros;

    try {
        dadosRegistros = await consultarPlazi(
            montarURLRegistros(
                genero,
                especie,
                limite
            )
        );
    } catch (erro) {
        return responderJSON(
            {
                source: "Plazi TreatmentBank",
                genus: genero,
                species: especie,
                treatmentsTotal:
                    dadosTratamentos.total,
                treatmentsUrl:
                    dadosTratamentos.url,
                materialsAvailable: false,
                materialCitationsTotal: null,
                total: null,
                returned: 0,
                limit: limite,
                records: [],
                warning:
                    "Os tratamentos foram encontrados, mas as citações de material estão temporariamente indisponíveis.",
                detail:
                    erro instanceof Error
                        ? erro.message
                        : String(erro)
            },
            206
        );
    }

    const registros = Array.isArray(
        dadosRegistros?.data
    )
        ? dadosRegistros.data.filter(
            function (registro) {
                return Boolean(registro?.MatCitId);
            }
        )
        : [];

    let total = registros.length;

    // A contagem adicional só é necessária quando a
    // primeira página atinge o limite solicitado.
    if (registros.length >= limite) {
        const dadosContagem = await consultarPlazi(
            montarURLContagem(genero, especie)
        );

        total = Number(
            dadosContagem?.data?.[0]?.MatCitId ||
            registros.length
        );
    }

    const resposta = responderJSON({
        source: "Plazi TreatmentBank",
        genus: genero,
        species: especie,
        treatmentsTotal: dadosTratamentos.total,
        treatmentsUrl: dadosTratamentos.url,
        materialsAvailable: true,
        materialCitationsTotal: total,
        total: total,
        returned: registros.length,
        limit: limite,
        records: registros
    });

    await cache.put(
        chaveCache,
        resposta.clone()
    );

    return resposta;
}

export default {
    async fetch(requisicao) {
        if (requisicao.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: CORS_HEADERS
            });
        }

        if (requisicao.method !== "GET") {
            return responderJSON(
                { error: "Método não permitido." },
                405
            );
        }

        try {
            return await atenderConsulta(requisicao);
        } catch (erro) {
            return responderJSON(
                {
                    error:
                        "O Plazi está temporariamente indisponível.",
                    detail:
                        erro instanceof Error
                            ? erro.message
                            : String(erro)
                },
                502
            );
        }
    }
};

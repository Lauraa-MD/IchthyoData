console.log("JavaScript conectado!");

const nomeEspecie = "Ituglanis bambui";

console.log(nomeEspecie);

const quantidadeEspecies = 2;

console.log(quantidadeEspecies);

console.log(quantidadeEspecies + 1);

const especieCriticamenteAmeacada = true;

console.log(especieCriticamenteAmeacada);

if (especieCriticamenteAmeacada === true) {
    console.log("Esta espécie necessita de atenção para conservação.");
}

function apresentarEspecie() {
    console.log("Espécie apresentada: " + nomeEspecie);
}

apresentarEspecie();

const speciesLinkEncontrados = document.querySelector(
    "#specieslink-encontrados"
);

const speciesLinkCarregados = document.querySelector(
    "#specieslink-carregados"
);

const speciesLinkCoordenadas = document.querySelector(
    "#specieslink-coordenadas"
);

const fishNet2Encontrados = document.querySelector(
    "#fishnet2-encontrados"
);

const fishNet2Carregados = document.querySelector(
    "#fishnet2-carregados"
);

const fishNet2Coordenadas = document.querySelector(
    "#fishnet2-coordenadas"
);

const plaziTratamentos = document.querySelector(
    "#plazi-tratamentos"
);

const plaziMateriais = document.querySelector(
    "#plazi-materiais"
);

const plaziMapeaveis = document.querySelector(
    "#plazi-mapeaveis"
);

const dadosRegistros = document.querySelector(
    "#dados-registros"
);

const dadosEspecies = document.querySelector(
    "#dados-especies"
);

const dadosCoordenadas = document.querySelector(
    "#dados-coordenadas"
);


const campoBusca = document.querySelector("#campo-busca");
const resultadoBusca = document.querySelector("#resultado-busca");
const formularioBusca = document.querySelector("#formulario-busca");
const listaDadosEspecies = document.querySelector("#lista-dados-especies");

const totalRegistros = document.querySelector("#total-registros");
const registrosExibidos = document.querySelector("#registros-exibidos");
const coordenadasUnicas = document.querySelector("#coordenadas-unicas");

function atualizarIndicadores(
    total,
    carregados,
    coordenadas
) {
    totalRegistros.textContent =
        total.toLocaleString("pt-BR");

    registrosExibidos.textContent =
        carregados.toLocaleString("pt-BR");

    coordenadasUnicas.textContent =
        coordenadas.toLocaleString("pt-BR");

}

function atualizarIndicadoresSpeciesLink(
    total,
    carregados,
    coordenadas
) {
    speciesLinkEncontrados.textContent =
        Number(total).toLocaleString("pt-BR");

    speciesLinkCarregados.textContent =
        Number(carregados).toLocaleString("pt-BR");

    speciesLinkCoordenadas.textContent =
        Number(coordenadas).toLocaleString("pt-BR");
}

function atualizarIndicadoresFishNet2(
    total,
    carregados,
    coordenadas
) {
    fishNet2Encontrados.textContent =
        Number(total).toLocaleString("pt-BR");

    fishNet2Carregados.textContent =
        Number(carregados).toLocaleString("pt-BR");

    fishNet2Coordenadas.textContent =
        Number(coordenadas).toLocaleString("pt-BR");
}

function atualizarIndicadoresPlazi(
    tratamentos,
    materiais,
    mapeaveis
) {
    function formatar(valor) {
        return valor === null ||
            valor === undefined ||
            !Number.isFinite(Number(valor))
            ? "—"
            : Number(valor).toLocaleString("pt-BR");
    }

    plaziTratamentos.textContent =
        formatar(tratamentos);

    plaziMateriais.textContent =
        formatar(materiais);

    plaziMapeaveis.textContent =
        formatar(mapeaveis);
}

function atualizarIndicadoresDadosProprios(
    registros,
    especies,
    coordenadas
) {
    dadosRegistros.textContent =
        Number(registros).toLocaleString("pt-BR");

    dadosEspecies.textContent =
        Number(especies).toLocaleString("pt-BR");

    dadosCoordenadas.textContent =
        Number(coordenadas).toLocaleString("pt-BR");
}







function indicarCarregamento() {
    totalRegistros.textContent = "…";
    registrosExibidos.textContent = "…";
    coordenadasUnicas.textContent = "…";

    speciesLinkEncontrados.textContent = "…";
    speciesLinkCarregados.textContent = "…";
    speciesLinkCoordenadas.textContent = "…";

    fishNet2Encontrados.textContent = "…";
fishNet2Carregados.textContent = "…";
fishNet2Coordenadas.textContent = "…";

    plaziTratamentos.textContent = "…";
    plaziMateriais.textContent = "…";
    plaziMapeaveis.textContent = "…";
}

// INÍCIO DO MAPA
const limitesAmericaDoSul = L.latLngBounds(
    [-57, -90],
    [15, -30]
);

const mapaEspecies = L.map("mapa-especies", {
    maxBounds: limitesAmericaDoSul,
    maxBoundsViscosity: 1.0,
    minZoom: 3
}).setView(
    [-15, -60],
    4
);

const camadaProjeto = L.featureGroup().addTo(mapaEspecies);
const camadaGBIF = L.featureGroup().addTo(mapaEspecies);
const camadaSpeciesLink = L.featureGroup().addTo(mapaEspecies);
const camadaFishNet2 = L.featureGroup().addTo(mapaEspecies);
const camadaPlazi = L.featureGroup().addTo(mapaEspecies);
const camadaDadosUsuario = L.featureGroup().addTo(mapaEspecies);

// CAMADA DAS BACIAS HIDROGRÁFICAS
const camadaBacias = L.geoJSON(null, {
    style: function () {
        return {
            color: "#2f7d6d",
            weight: 1.2,
            fillColor: "#7fc8b8",
            fillOpacity: 0.12
        };
    },

    onEachFeature: function (feicao, camada) {
        const propriedades = feicao.properties || {};
        const areaTotalKm2 = turf.area(feicao) / 1000000;

const nomesBacias = {
    "6040011780": "São Francisco"
};

const codigoBacia = String(propriedades.MAIN_BAS);
const nomeBacia =
    nomesBacias[codigoBacia] || "Grande bacia hidrográfica";


        camada.bindPopup(`
    <strong>${nomeBacia}</strong>
    <br><strong>Código MAIN_BAS:</strong>
    ${codigoBacia}
    <br><strong>Área total aproximada:</strong>
    ${areaTotalKm2.toLocaleString("pt-BR", {
        maximumFractionDigits: 1
    })} km²
`);

        camada.on({
            mouseover: function (evento) {
                evento.target.setStyle({
                    weight: 2.5,
                    fillOpacity: 0.25
                });
            },

            mouseout: function (evento) {
                camadaBacias.resetStyle(evento.target);
            }
        });
    }
});

// CARREGAMENTO DO ARQUIVO GEOJSON
fetch("dados/bacias/grandes_bacias.geojson")
    .then(function (resposta) {
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o GeoJSON.");
        }

        return resposta.json();
    })
    .then(function (dados) {
        camadaBacias.addData(dados);

        console.log(
            "Bacias hidrográficas carregadas:",
            dados.features.length
        );
    })
    .catch(function (erro) {
        console.error(
            "Erro ao carregar as bacias hidrográficas:",
            erro
        );
    });


// ECORREGIÕES DE ÁGUA DOCE — FEOW

const camadaEcorregioes = L.geoJSON(null, {
    style: function () {
        return {
            color: "#7d4ca5",
            weight: 1.6,
            opacity: 0.9,
            fillColor: "#b99bd3",
            fillOpacity: 0.20
        };
    },

    onEachFeature: function (
        feicao,
        camada
    ) {
        const propriedades =
            feicao.properties || {};

        const codigoFeow =
            propriedades.FEOW_ID;

        const areaKm2 =
            Number(
                propriedades.AREA_SKM
            );

        camada.bindPopup(`
            <strong>
                Ecorregião de água doce — FEOW
            </strong>

            <br><strong>Código FEOW:</strong>
            ${codigoFeow}

            <br><strong>Área aproximada:</strong>
            ${areaKm2.toLocaleString(
                "pt-BR",
                {
                    maximumFractionDigits: 1
                }
            )} km²

            <br>

            <a
                href="https://www.feow.org/ecoregions/details/${codigoFeow}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver informações na FEOW
            </a>
        `);

        camada.on({
            mouseover: function (evento) {
                evento.target.setStyle({
                    color: "#542675",
                    weight: 3,
                    opacity: 1,
                    fillColor: "#7d4ca5",
                    fillOpacity: 0.48
                });
            },

            mouseout: function (evento) {
                camadaEcorregioes.resetStyle(
                    evento.target
                );
            }
        });
    }
});
fetch("dados/ecoregions/ecoregions_feow.geojson")
    .then(function (resposta) {
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as ecorregiões.");
        }

        return resposta.json();
    })
    .then(function (dados) {
        camadaEcorregioes.addData(dados);

        console.log(
            "Ecorregiões FEOW carregadas:",
            dados.features.length
        );
    })
    .catch(function (erro) {
        console.error("Erro ao carregar as ecorregiões FEOW:", erro);
    });

// PRINCIPAIS RIOS DA AMÉRICA DO SUL
const camadaRios = L.geoJSON(null, {
    style: function (feicao) {
        const ordemStrahler =
            Number(feicao.properties?.ORD_STRA) || 6;

        return {
            color: "#2f80c9",
            weight: ordemStrahler >= 8 ? 1.8 : 1.1,
            opacity: 0.8
        };
    },

    onEachFeature: function (feicao, camada) {
        const propriedades = feicao.properties || {};

        const idRio = propriedades.HYRIV_ID ?? "Não informado";
        const ordem = propriedades.ORD_STRA ?? "Não informada";
        const vazao = Number(propriedades.DIS_AV_CMS);
        const areaMontante = Number(propriedades.UPLAND_SKM);

        const vazaoFormatada = Number.isFinite(vazao)
            ? vazao.toLocaleString("pt-BR", {
                maximumFractionDigits: 1
            })
            : "Não informada";

        const areaFormatada = Number.isFinite(areaMontante)
            ? areaMontante.toLocaleString("pt-BR", {
                maximumFractionDigits: 1
            })
            : "Não informada";

        camada.bindPopup(`
            <strong>Trecho da rede hidrográfica</strong>
            <br><strong>ID HydroRIVERS:</strong> ${idRio}
            <br><strong>Ordem de Strahler:</strong> ${ordem}
            <br><strong>Vazão média estimada:</strong> ${vazaoFormatada} m³/s
            <br><strong>Área a montante:</strong> ${areaFormatada} km²
            <br><small>Fonte: HydroRIVERS – HydroSHEDS</small>
        `);
    }
});

fetch("dados/rios/rios_principais_simplificados.geojson")
    .then(function (resposta) {
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os rios.");
        }

        return resposta.json();
    })
    .then(function (dados) {
        camadaRios.addData(dados);

        console.log(
            "Trechos de rios carregados:",
            dados.features.length
        );
    })
    .catch(function (erro) {
        console.error("Erro ao carregar os rios:", erro);
    });


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        noWrap: true,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
        ).addTo(mapaEspecies);




// CONTROLE DOS TIPOS DE DADOS
const tiposDados = {
    "Registros GBIF": camadaGBIF,
    "Registros SpeciesLink": camadaSpeciesLink,
    "Registros FishNet2": camadaFishNet2,
    "Plazi — literatura": camadaPlazi,
    "Dados importados": camadaDadosUsuario
};


// Camada usada somente para os símbolos das fontes
// quando o relevo estiver ativado.
const camadaSimbolosFontes =
    L.layerGroup();


// CONTROLE DAS CAMADAS DE REFERÊNCIA
const camadasReferencia = {
    "Grandes bacias hidrográficas": camadaBacias,
    "Ecorregiões de água doce — FEOW": camadaEcorregioes,
    "Principais rios da América do Sul": camadaRios
};


const controleDados = L.control.layers(
    null,
    tiposDados,
    {
        collapsed: false,
        position: "topright"
    }
).addTo(mapaEspecies);

controleDados
    .getContainer()
    .classList.add("controle-dados");


const controleReferencia = L.control.layers(
    null,
    camadasReferencia,
    {
        collapsed: false,
        position: "topright"
    }
).addTo(mapaEspecies);

controleReferencia
    .getContainer()
    .classList.add("controle-referencia");

    // =====================================================
// CAMADA VISUAL DE RELEVO
// =====================================================

// Grupo inicialmente vazio que aparecerá no controle.
const camadaRelevo = L.layerGroup();

// =====================================================
// PAINEL DE RELEVO E ALTITUDE
// =====================================================

const painelRelevo = L.control({
    position: "bottomright"
});

painelRelevo.onAdd = function () {
    const painel = L.DomUtil.create(
        "div",
        "painel-relevo"
    );

    painel.innerHTML = `
        <div class="painel-relevo-titulo">
            Relevo e altitude
        </div>

        <label class="painel-relevo-opcao">
            <input
                type="checkbox"
                id="ativar-relevo"
            >
            Mostrar relevo
        </label>

        <div
            id="legenda-relevo"
            class="legenda-relevo"
        >
            <div class="barra-relevo"></div>

            <div class="valores-relevo">
                <span>0 m</span>
                <span>500</span>
                <span>1.000</span>
                <span>2.000</span>
                <span>3.000</span>
                <span>≥ 4.000 m</span>
            </div>

            <small class="legenda-relevo-texto">
                Terras baixas → maiores altitudes
            </small>

            <div class="legenda-fontes-relevo">
    <strong>Fonte dos registros</strong>

    <div class="item-fonte-relevo">
        <span class="formato-gbif-relevo"></span>
        <span>GBIF</span>
    </div>

<div class="item-fonte-relevo">
    <span
        class="formato-fishnet2-relevo"
    ></span>

    <span>FishNet2</span>
</div>

    <div class="item-fonte-relevo">
        <span class="formato-plazi-relevo"></span>
        <span>Plazi — literatura</span>
    </div>

    <div class="item-fonte-relevo">
        <span class="formato-specieslink-relevo"></span>
        <span>speciesLink</span>
    </div>

    <div class="item-fonte-relevo">
        <span class="formato-dados-relevo">△</span>
        <span>Dados importados</span>
    </div>

    <small>
        A cor interna representa a altitude.
    </small>
</div>


    `;

    // Evita que os cliques no painel movimentem o mapa.
    L.DomEvent.disableClickPropagation(painel);
    L.DomEvent.disableScrollPropagation(painel);

    return painel;
};

painelRelevo.addTo(mapaEspecies);

const botaoAtivarRelevo =
    document.querySelector("#ativar-relevo");

const legendaRelevo =
    document.querySelector("#legenda-relevo");

botaoAtivarRelevo.addEventListener(
    "change",
    async function () {
        if (botaoAtivarRelevo.checked) {
            camadaRelevo.addTo(mapaEspecies);
            legendaRelevo.classList.add("visivel");
        } else {
            mapaEspecies.removeLayer(camadaRelevo);
            legendaRelevo.classList.remove("visivel");
        }

        await atualizarCoresDosRegistros();
    }
);


async function criarCamadaVisualRelevo() {
    try {
        console.log("Preparando camada visual de relevo...");

        const resposta = await fetch(
            caminhoRasterElevacao
        );

        if (!resposta.ok) {
            throw new Error(
                `Não foi possível carregar o raster: ${resposta.status}`
            );
        }

        const dadosRaster =
            await resposta.arrayBuffer();

        const georaster =
            await parseGeoraster(dadosRaster);

        // Degradê contínuo:
        // terras baixas claras e altitudes elevadas intensas.
        const escalaRelevo = chroma
            .scale([
            
        "#d9f0a3", // 0 m: verde-claro
        "#66bd63", // 500 m: verde
        "#ffe066", // 1.000 m: amarelo
        "#fdae3c", // 2.000 m: laranja
        "#e53935", // 3.000 m: vermelho
        "#6a1b9a"  // 4.000 m ou mais: roxo
    ])
    .domain([
        0,
        500,
        1000,
        2000,
        3000,
        4000
    ])
    
            .mode("lab");

        const camadaRaster = new GeoRasterLayer({
            georaster: georaster,

            pixelValuesToColorFn: function (valores) {
    const altitude = Number(valores[0]);

    const semDados =
        !Number.isFinite(altitude) ||
        altitude === georaster.noDataValue;

    // Oceano e pixels sem elevação ficam transparentes.
    if (semDados || altitude <= 0) {
        return null;
    }

    const altitudeLimitada = Math.min(
        altitude,
        4000
    );

    return escalaRelevo(
        altitudeLimitada
    ).hex();
},

opacity: 0.72,
resolution: 256

        });

        camadaRaster.addTo(camadaRelevo);

        console.log(
            "Camada visual de relevo preparada."
        );

    } catch (erro) {
        console.error(
            "Erro ao criar a camada visual de relevo:",
            erro
        );
    }
}





// FIM DO MAPA


// =====================================================
// LEITURA DO MODELO DE ELEVAÇÃO
// =====================================================

const caminhoRasterElevacao =
    "dados/relevo/elevacao_neotropicos_otimizada.tif";

let imagemElevacao = null;

async function carregarRasterElevacao() {
    try {
        console.log("Carregando modelo de elevação...");

        const arquivoTiff =
            await GeoTIFF.fromUrl(caminhoRasterElevacao);

        imagemElevacao = await arquivoTiff.getImage();

        console.log("Modelo de elevação carregado.");
        console.log(
            "Dimensões:",
            imagemElevacao.getWidth(),
            "x",
            imagemElevacao.getHeight()
        );

        console.log(
            "Limites geográficos:",
            imagemElevacao.getBoundingBox()
        );

        return imagemElevacao;
    } catch (erro) {
        console.error(
            "Erro ao carregar o modelo de elevação:",
            erro
        );

        return null;
    }
}

const promessaRasterElevacao = carregarRasterElevacao();

criarCamadaVisualRelevo();

// =====================================================
// ALTITUDE AO CLICAR NO MAPA
// =====================================================

mapaEspecies.on("click", async function (evento) {

    // A consulta aparece somente quando o relevo está ativado.
    if (!mapaEspecies.hasLayer(camadaRelevo)) {
        return;
    }

    const latitude = evento.latlng.lat;
    const longitude = evento.latlng.lng;

    const altitude = await obterAltitude(
        latitude,
        longitude
    );

    let conteudoPopup;

    if (altitude === null || altitude <= 0) {
        conteudoPopup = `
            <strong>Altitude</strong>
            <br>Não disponível para este local.
        `;
    } else {
        conteudoPopup = `
            <strong>Altitude estimada:</strong>
            ${formatarAltitude(altitude)}

            <br><small>
                Modelo digital de elevação com resolução
                aproximada de 500 m.
            </small>
        `;
    }

    L.popup()
        .setLatLng(evento.latlng)
        .setContent(conteudoPopup)
        .openOn(mapaEspecies);
});

async function obterAltitude(latitude, longitude) {

    const imagem =
        imagemElevacao || await promessaRasterElevacao;

    if (!imagem) {
        return null;
    }

    const limites = imagem.getBoundingBox();

    const longitudeMinima = limites[0];
    const latitudeMinima = limites[1];
    const longitudeMaxima = limites[2];
    const latitudeMaxima = limites[3];

    const coordenadaValida =
        longitude >= longitudeMinima &&
        longitude <= longitudeMaxima &&
        latitude >= latitudeMinima &&
        latitude <= latitudeMaxima;

    if (!coordenadaValida) {
        return null;
    }

    const largura = imagem.getWidth();
    const altura = imagem.getHeight();

    let coluna = Math.floor(
        (
            (longitude - longitudeMinima) /
            (longitudeMaxima - longitudeMinima)
        ) * largura
    );

    let linha = Math.floor(
        (
            (latitudeMaxima - latitude) /
            (latitudeMaxima - latitudeMinima)
        ) * altura
    );

    coluna = Math.min(
        Math.max(coluna, 0),
        largura - 1
    );

    linha = Math.min(
        Math.max(linha, 0),
        altura - 1
    );

    try {
        const valores = await imagem.readRasters({
            window: [
                coluna,
                linha,
                coluna + 1,
                linha + 1
            ]
        });

        const altitude = Number(valores[0][0]);
        const valorNoData = imagem.getGDALNoData();

        if (
            !Number.isFinite(altitude) ||
            altitude === valorNoData
        ) {
            return null;
        }




        // Valores negativos do modelo serão tratados como 0 m.
        return Math.max(0, Math.round(altitude));
    } catch (erro) {
        console.error(
            "Erro ao consultar altitude:",
            erro
        );

        return null;
    }
}

// =====================================================
// CORES DOS REGISTROS CONFORME A ALTITUDE
// =====================================================

function obterCorAltitude(altitude) {

    if (altitude === null || !Number.isFinite(altitude)) {
        return "#808080";
    }

    if (altitude <= 500) {
        return "#1a9850";
    }

    if (altitude <= 1000) {
        return "#91cf60";
    }

    if (altitude <= 2000) {
        return "#fee08b";
    }

    if (altitude <= 3000) {
        return "#fc8d59";
    }

    if (altitude <= 4000) {
        return "#d73027";
    }

    return "#762a83";
}


// =====================================================
// CORES DOS PONTOS CONFORME A FONTE OU O RELEVO
// =====================================================

const estilosPorFonte = {
    gbif: {
        color: "#9a4d00",
        fillColor: "#f28c28"
    },

    speciesLink: {
        color: "#4b287d",
        fillColor: "#9b72cf"
    },

    fishNet2: {
    color: "#8b1a1a",
    fillColor: "#e53935"
    },

    plazi: {
        color: "#005f56",
        fillColor: "#00897b"
    },

    dadosProprios: {
        color: "#174f78",
        fillColor: "#3b8fc2"
    }
};

// Cria o símbolo que identifica a fonte do registro.
// Cria o símbolo que identifica a fonte do registro.
function obterTamanhoIconeRelevo() {
    const zoom =
        mapaEspecies.getZoom();

    if (zoom <= 3) {
        return 12;
    }

    if (zoom === 4) {
        return 14;
    }

    if (zoom <= 6) {
        return 16;
    }

    return 18;
}


// Cria um símbolo preenchido pela cor da altitude.
function criarIconeFonte(
    fonte,
    corAltitude
) {
    const tamanho =
        obterTamanhoIconeRelevo();

    const contorno = "#26352f";

    const preenchimento =
        corAltitude ||
        "#d6d6d6";

    const formas = {
        gbif: `
            <circle
                cx="9"
                cy="9"
                r="6.5"
            />
        `,

        speciesLink: `
            <polygon
                points="
                    9,1.5
                    16.5,9
                    9,16.5
                    1.5,9
                "
            />
        `,

        fishNet2: `
            <rect
                x="2"
                y="2"
                width="14"
                height="14"
                rx="1.5"
            />
        `,

        plazi: `
            <polygon
                points="
                    5,2
                    13,2
                    17,9
                    13,16
                    5,16
                    1,9
                "
            />
        `,

        dadosProprios: `
            <polygon
                points="
                    9,1.5
                    16.5,16
                    1.5,16
                "
            />
        `
    };

    return L.divIcon({
        className:
            "icone-fonte-registro",

        html: `
            <svg
                viewBox="0 0 18 18"
                width="${tamanho}"
                height="${tamanho}"
                aria-hidden="true"
            >
                <g
                    fill="${preenchimento}"
                    stroke="${contorno}"
                    stroke-width="2"
                    stroke-linejoin="round"
                >
                    ${formas[fonte] || formas.gbif}
                </g>
            </svg>
        `,

        iconSize: [
            tamanho,
            tamanho
        ],

        iconAnchor: [
            tamanho / 2,
            tamanho / 2
        ],

        popupAnchor: [
            0,
            -(tamanho / 2)
        ]
    });
}


// Cria os símbolos apenas para fontes visíveis.
function formatarAltitude(altitude) {
    if (
        altitude === null ||
        !Number.isFinite(altitude)
    ) {
        return "Não disponível";
    }

    return `${Number(altitude).toLocaleString(
        "pt-BR"
    )} m`;
}
function atualizarSimbolosDasFontes() {
    camadaSimbolosFontes.clearLayers();

    if (!botaoAtivarRelevo.checked) {
        if (
            mapaEspecies.hasLayer(
                camadaSimbolosFontes
            )
        ) {
            mapaEspecies.removeLayer(
                camadaSimbolosFontes
            );
        }

        return;
    }

function atualizarSimbolosAoAlterarCamada(
    evento
) {
    const camadasDeFontes = [
        camadaGBIF,
        camadaSpeciesLink,
        camadaFishNet2,
        camadaPlazi,
        camadaDadosUsuario
    ];

    if (
        botaoAtivarRelevo.checked &&
        camadasDeFontes.includes(evento.layer)
    ) {
        atualizarSimbolosDasFontes();
    }
}

mapaEspecies.on(
    "overlayadd",
    atualizarSimbolosAoAlterarCamada
);

mapaEspecies.on(
    "overlayremove",
    atualizarSimbolosAoAlterarCamada
);



    const conjuntos = [
        {
            camada: camadaGBIF,
            fonte: "gbif"
        },
        {
            camada: camadaSpeciesLink,
            fonte: "speciesLink"
        },
        {
            camada: camadaFishNet2,
            fonte: "fishNet2"
        },
        {
            camada: camadaPlazi,
            fonte: "plazi"
        },
        {
            camada: camadaDadosUsuario,
            fonte: "dadosProprios"
        }
    ];

    conjuntos.forEach(function (conjunto) {
        if (
            !mapaEspecies.hasLayer(
                conjunto.camada
            )
        ) {
            return;
        }

        conjunto.camada
            .getLayers()
            .forEach(function (marcador) {
                if (
                    typeof marcador.getLatLng !==
                    "function"
                ) {
                    return;
                }

                const altitude =
                    marcador.options.altitude;

                const corAltitude =
                    obterCorAltitude(
                        altitude
                    );

                const simbolo =
                    L.marker(
                        marcador.getLatLng(),
                        {
                            icon:
                                criarIconeFonte(
                                    conjunto.fonte,
                                    corAltitude
                                ),

                            interactive: true,
                            keyboard: true
                        }
                    );

                simbolo.options.fonteRegistro =
                    conjunto.fonte;

                const popupOriginal =
                    typeof marcador.getPopup ===
                    "function"
                        ? marcador.getPopup()
                        : null;

                if (popupOriginal) {
                    const conteudoOriginal =
                        popupOriginal.getContent();

                    if (
                        typeof conteudoOriginal ===
                        "string"
                    ) {
                        simbolo.bindPopup(
                            `
                                ${conteudoOriginal}

                                <hr>

                                <strong>
                                    Altitude aproximada:
                                </strong>

                                ${formatarAltitude(
                                    altitude
                                )}
                            `,
                            opcoesPopupOcorrencias
                        );
                    }
                }

                simbolo.addTo(
                    camadaSimbolosFontes
                );
            });
    });

    camadaSimbolosFontes.addTo(
        mapaEspecies
    );

    camadaSimbolosFontes.bringToFront();
}


// Atualiza a visualização normal ou altitudinal.
async function atualizarCoresDosRegistros() {
    const relevoAtivo =
        botaoAtivarRelevo.checked;

    const camadas = [
        {
            camada: camadaGBIF,
            fonte: "gbif"
        },
        {
            camada: camadaSpeciesLink,
            fonte: "speciesLink"
        },
        {
            camada: camadaFishNet2,
            fonte: "fishNet2"
        },
        {
            camada: camadaPlazi,
            fonte: "plazi"
        },
        {
            camada: camadaDadosUsuario,
            fonte: "dadosProprios"
        }
    ];

    for (const item of camadas) {
        const marcadores =
            item.camada.getLayers();

        for (const marcador of marcadores) {
            if (
                typeof marcador.getLatLng !==
                    "function" ||
                typeof marcador.setStyle !==
                    "function"
            ) {
                continue;
            }

            const estiloFonte =
                estilosPorFonte[item.fonte];

            if (!relevoAtivo) {
                if (
                    typeof marcador.setRadius ===
                    "function"
                ) {
                    marcador.setRadius(7);
                }

                marcador.setStyle({
                    color:
                        estiloFonte.color,

                    fillColor:
                        estiloFonte.fillColor,

                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.85
                });

                continue;
            }

            if (
                !mapaEspecies.hasLayer(
                    item.camada
                )
            ) {
                continue;
            }

            
            // Oculta o círculo original.
            marcador.setStyle({
                opacity: 0,
                fillOpacity: 0
            });

            let altitude =
                marcador.options.altitude;

            if (
                !Number.isFinite(altitude)
            ) {
                const coordenada =
                    marcador.getLatLng();

                altitude =
                    await obterAltitude(
                        coordenada.lat,
                        coordenada.lng
                    );

                marcador.options.altitude =
                    altitude;
            }
        }
    }

    atualizarSimbolosDasFontes();
}



function atualizarSimbolosAoAlterarCamada(
    evento
) {
    const camadasDeFontes = [
        camadaGBIF,
        camadaSpeciesLink,
        camadaFishNet2,
        camadaPlazi,
        camadaDadosUsuario
    ];

    if (
        botaoAtivarRelevo.checked &&
        camadasDeFontes.includes(evento.layer)
    ) {
        atualizarSimbolosDasFontes();
    }
}

mapaEspecies.on(
    "overlayadd",
    atualizarSimbolosAoAlterarCamada
);

mapaEspecies.on(
    "overlayremove",
    atualizarSimbolosAoAlterarCamada
);



// INÍCIO DA BUSCA GERAL NO GBIF


const resultadosBancos = {
    gbif: null,
    speciesLink: null,
    fishNet2: null,
    plazi: null
};

function formatarQuantidade(valor) {
    return Number(valor || 0)
        .toLocaleString("pt-BR");
}

function montarResumoFonte(
    titulo,
    chaveFonte,
    dados
) {
    if (!dados) {
        return `
            <strong>${titulo}</strong><br>
            Consultando...<br><br>
        `;
    }

    if (dados.erro) {
        return `
            <strong>${titulo}</strong><br>
            Fonte temporariamente indisponível.<br><br>
        `;
    }

    const informacaoDisponiveis =
        Number.isFinite(dados.disponiveisMapa)
            ? `
                ${formatarQuantidade(
                    dados.disponiveisMapa
                )}
                registros disponíveis para o mapa<br>
            `
            : "";

    const botaoCarregarTodos =
        dados.temMais === true
            ? `
                <button
                    type="button"
                    class="botao-carregar-todos"
                    data-fonte="${chaveFonte}"
                >
                    Carregar todos
                </button>
                <br>
            `
            : "";

    return `
        <strong>${titulo}</strong><br>

        ${formatarQuantidade(dados.encontrados)}
        registros encontrados na fonte<br>

        ${informacaoDisponiveis}

        ${formatarQuantidade(dados.carregados)}
        registros carregados no mapa<br>

        ${formatarQuantidade(dados.coordenadas)}
        coordenadas únicas<br>

        ${botaoCarregarTodos}

        <br>
    `;
}

function montarResumoPlazi(dados) {
    const titulo = "Plazi — literatura";

    if (!dados) {
        return `
            <strong>${titulo}</strong><br>
            Consultando...<br><br>
        `;
    }

    if (dados.erro) {
        return `
            <strong>${titulo}</strong><br>
            Fonte temporariamente indisponível.<br><br>
        `;
    }

    const linkTratamentos = criarLinkPlazi(
        dados.urlTratamentos,
        "Ver tratamentos no Plazi"
    );

    if (dados.materiaisDisponiveis === false) {
        return `
            <strong>${titulo}</strong><br>

            ${formatarQuantidade(dados.tratamentos)}
            tratamentos encontrados na literatura<br>

            Citações de material temporariamente
            indisponíveis<br>

            Registros com coordenadas temporariamente
            indisponíveis<br>

            <span class="aviso-plazi-sem-material">
                O Plazi confirmou a literatura, mas seu
                serviço de dados de espécimes não respondeu.
                Tente novamente mais tarde.
            </span><br>

            ${linkTratamentos ? `${linkTratamentos}<br>` : ""}

            <br>
        `;
    }

    const botaoCarregarTodos =
        dados.temMais === true
            ? `
                <button
                    type="button"
                    class="botao-carregar-todos"
                    data-fonte="plazi"
                >
                    Carregar todas as citações
                </button>
                <br>
            `
            : "";

    const avisoSemMaterial =
        dados.tratamentos > 0 &&
        dados.materiais === 0
            ? `
                <span class="aviso-plazi-sem-material">
                    Há literatura no Plazi, mas nenhuma
                    citação de material foi estruturada para
                    este nome. Por isso não há pontos para o
                    mapa.
                </span><br>
            `
            : "";

    return `
        <strong>${titulo}</strong><br>

        ${formatarQuantidade(dados.tratamentos)}
        tratamentos encontrados na literatura<br>

        ${formatarQuantidade(dados.materiais)}
        citações de material estruturadas<br>

        ${formatarQuantidade(dados.carregados)}
        registros com coordenadas para o mapa<br>

        ${formatarQuantidade(dados.coordenadas)}
        coordenadas únicas<br>

        ${avisoSemMaterial}

        ${linkTratamentos ? `${linkTratamentos}<br>` : ""}

        ${botaoCarregarTodos}

        <br>
    `;
}

function atualizarQuadroResultados(nomeCientifico) {
    let conteudo = `
        <strong>Consulta concluída</strong><br>

        Espécie pesquisada:
        <em>${nomeCientifico}</em>

        <div class="explicacao-filtros">
    <strong>Como os dados são filtrados:</strong>

    A consulta não exige uma quantidade mínima de
    registros. O total encontrado representa os registros
    associados ao nome científico em cada fonte.

    Para o mapa, são mantidos apenas registros com
coordenadas numéricas válidas dentro do recorte da
América do Sul.

No GBIF, a consulta considera apenas
exemplares preservados em coleções científicas
(PRESERVED_SPECIMEN). Também são excluídos registros
com problemas geoespaciais e ocorrências que não estejam
classificadas como presentes.

No Plazi, “tratamentos” indicam a presença do nome em
publicações taxonômicas. Apenas as citações de material
estruturadas e com coordenadas válidas podem ser
representadas no mapa. Por isso, uma espécie pode possuir
literatura no Plazi sem apresentar pontos geográficos.

    Inicialmente, são carregados até 300 registros elegíveis
    por fonte. Quando houver resultados adicionais, é
    possível utilizar “Carregar todos”.

    Registros que possuem a mesma latitude e longitude são
    agrupados em um único ponto no mapa.
</div>
    `;

    conteudo += montarResumoFonte(
        "GBIF",
        "gbif",
        resultadosBancos.gbif
    );

    conteudo += montarResumoFonte(
        "speciesLink",
        "speciesLink",
        resultadosBancos.speciesLink
    );

    conteudo += montarResumoFonte(
        "FishNet2",
        "fishNet2",
        resultadosBancos.fishNet2
    );

    conteudo += montarResumoPlazi(
        resultadosBancos.plazi
    );

    resultadoBusca.innerHTML = conteudo;

    const botoesCarregarTodos =
        resultadoBusca.querySelectorAll(
            ".botao-carregar-todos"
        );

    botoesCarregarTodos.forEach(function (botao) {
        botao.addEventListener(
            "click",
            function () {
                carregarTodosDaFonte(
                    botao.dataset.fonte,
                    nomeCientifico,
                    botao
                );
            }
        );
    });
}

async function carregarTodosDaFonte(
    fonte,
    nomeCientifico,
    botao
) {

    const dadosFonte =
    resultadosBancos[fonte];

const totalPrevisto =
    Number.isFinite(
        dadosFonte?.disponiveisMapa
    )
        ? dadosFonte.disponiveisMapa
        : dadosFonte?.encontrados || 0;

if (totalPrevisto > 5000) {
    const nomesFontes = {
        gbif: "GBIF",
        speciesLink: "speciesLink",
        fishNet2: "FishNet2",
        plazi: "Plazi — literatura"
    };

    const confirmado = window.confirm(
        `${nomesFontes[fonte]} possui ` +
        `${formatarQuantidade(totalPrevisto)} ` +
        `registros disponíveis. ` +
        `Carregar todos pode deixar o mapa lento. ` +
        `Deseja continuar?`
    );

    if (!confirmado) {
        return;
    }
}

    const textoOriginal =
        botao.textContent;

    botao.disabled = true;
    botao.textContent = "Carregando...";

    try {
        if (fonte === "gbif") {
            await carregarTodosGBIF(
                nomeCientifico
            );
        }

        if (fonte === "speciesLink") {
            await carregarTodosSpeciesLink(
                nomeCientifico
            );
        }

        if (fonte === "fishNet2") {
            await carregarTodosFishNet2(
                nomeCientifico
            );
        }

        if (fonte === "plazi") {
            await carregarTodosPlazi(
                nomeCientifico
            );
        }
    } catch (erro) {
        console.error(
            `Erro ao carregar todos os registros de ${fonte}:`,
            erro
        );

        if (botao.isConnected) {
            botao.disabled = false;
            botao.textContent =
                "Tentar novamente";
        }

        return;
    }

    if (botao.isConnected) {
        botao.disabled = false;
        botao.textContent = textoOriginal;
    }
}
formularioBusca.addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        const nomeCientifico =
            campoBusca.value.trim();

        if (nomeCientifico === "") {
            resultadoBusca.textContent =
                "Digite o nome científico de uma espécie.";
            return;
        }

        resultadosBancos.gbif = null;
resultadosBancos.speciesLink = null;
resultadosBancos.fishNet2 = null;
resultadosBancos.plazi = null;

atualizarQuadroResultados(nomeCientifico);

buscarOcorrenciasGBIF(nomeCientifico);
buscarOcorrenciasSpeciesLink(nomeCientifico);
buscarOcorrenciasFishNet2(nomeCientifico);
buscarOcorrenciasPlazi(nomeCientifico);
    }
);

let estadoGBIF = {
    nomeCientifico: "",
    totalFonte: 0,
    totalMapa: 0,
    registros: []
};

const chaveChecklistGBIF =
    "7ddf754f-d193-4cc9-b351-99906754a03b";

async function resolverTaxonGBIF(
    nomeCientifico
) {
    const urlCorrespondencia =
        new URL(
            "https://api.gbif.org/v2/species/match"
        );

    urlCorrespondencia.searchParams.set(
        "scientificName",
        nomeCientifico
    );

    urlCorrespondencia.searchParams.set(
        "checklistKey",
        chaveChecklistGBIF
    );

    const respostaCorrespondencia =
        await fetch(urlCorrespondencia);

    if (!respostaCorrespondencia.ok) {
        throw new Error(
            "Não foi possível conferir o nome no GBIF."
        );
    }

    const dadosCorrespondencia =
        await respostaCorrespondencia.json();

    const uso =
        dadosCorrespondencia.usage;

    const tipoCorrespondencia =
        dadosCorrespondencia
            .diagnostics
            ?.matchType ||
        "DESCONHECIDA";

    const nomeBuscado =
        nomeCientifico
            .trim()
            .toLowerCase();

    const nomeLocalizado =
        (
            uso?.canonicalName ||
            ""
        )
            .trim()
            .toLowerCase();

    // Impede que o GBIF transforme uma espécie
    // não encontrada em uma busca pelo gênero.
    if (
        !uso ||
        !uso.key ||
        tipoCorrespondencia !== "EXACT" ||
        nomeLocalizado !== nomeBuscado
    ) {
        return null;
    }

    return {
        chaveTaxon: uso.key,

        nomeAceito:
            uso.canonicalName ||
            nomeCientifico,

        tipoCorrespondencia:
            tipoCorrespondencia
    };
}
function aplicarFiltroTaxonomicoGBIF(
    url,
    nomeCientifico,
    taxonGBIF = null
) {
    if (
        taxonGBIF &&
        taxonGBIF.chaveTaxon
    ) {
        url.searchParams.set(
            "taxonKey",
            String(taxonGBIF.chaveTaxon)
        );

        if (chaveChecklistGBIF) {
            url.searchParams.set(
                "checklistKey",
                chaveChecklistGBIF
            );
        }

        return;
    }

    // Mantém uma alternativa caso o nome não seja
    // localizado na classificação atual.
    url.searchParams.set(
        "scientificName",
        nomeCientifico
    );
}

function criarURLGBIFTotal(
    nomeCientifico,
    taxonGBIF = null
) {
    const url = new URL(
        "https://api.gbif.org/v1/occurrence/search"
    );

    aplicarFiltroTaxonomicoGBIF(
        url,
        nomeCientifico,
        taxonGBIF
    );

   url.searchParams.set(
    "basisOfRecord",
    "PRESERVED_SPECIMEN"
);

url.searchParams.append(
    "basisOfRecord",
    "MATERIAL_CITATION"
);

url.searchParams.append(
    "basisOfRecord",
    "MATERIAL_CITATION"
);

    url.searchParams.set("limit", "0");

    return url;
}

function criarURLGBIFMapa(
    scientificName,
    offset = 0,
    limite = 300,
    taxonGBIF = null
) {
    const url = new URL(
        "https://api.gbif.org/v1/occurrence/search"
    );

    aplicarFiltroTaxonomicoGBIF(
        url,
        scientificName,
        taxonGBIF
    );

    url.searchParams.set(
    "basisOfRecord",
    "PRESERVED_SPECIMEN"
);

url.searchParams.append(
    "basisOfRecord",
    "MATERIAL_CITATION"
);

    url.searchParams.set(
        "continent",
        "SOUTH_AMERICA"
    );

    url.searchParams.set(
        "hasCoordinate",
        "true"
    );

    url.searchParams.set(
        "hasGeospatialIssue",
        "false"
    );

    url.searchParams.set(
        "occurrenceStatus",
        "PRESENT"
    );

    url.searchParams.set(
        "limit",
        String(limite)
    );

    // Evita que o navegador reutilize respostas da versão
    // anterior do Worker, que não possuíam a contagem de
    // tratamentos.
    url.searchParams.set(
        "responseVersion",
        "3"
    );

    url.searchParams.set(
        "offset",
        String(offset)
    );

    return url.toString();
}

async function obterJSONGBIF(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(
            `Consulta GBIF: HTTP ${resposta.status}`
        );
    }

    return resposta.json();
}

const opcoesPopupOcorrencias = {
    maxWidth: 380,
    maxHeight: 280,
    autoPan: true,
    keepInView: true,

    autoPanPaddingTopLeft:
        L.point(30, 30),

    autoPanPaddingBottomRight:
        L.point(30, 30)
};

function vincularPopupOcorrencia(
    marcador,
    conteudo
) {
    marcador.bindPopup(
        conteudo,
        opcoesPopupOcorrencias
    );
}


function desenharRegistrosGBIF(
    nomeCientifico,
    registros
) {
    camadaGBIF.clearLayers();

    const registrosPorCoordenada =
        new Map();

    registros.forEach(function (registro) {
        const latitude = Number(
            registro.decimalLatitude
        );

        const longitude = Number(
            registro.decimalLongitude
        );

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            return;
        }

        const chaveCoordenada =
            latitude.toFixed(6) +
            "," +
            longitude.toFixed(6);

        if (
            !registrosPorCoordenada.has(
                chaveCoordenada
            )
        ) {
            registrosPorCoordenada.set(
                chaveCoordenada,
                {
                    latitude: latitude,
                    longitude: longitude,
                    registros: []
                }
            );
        }

        registrosPorCoordenada
            .get(chaveCoordenada)
            .registros
            .push(registro);
    });

    registrosPorCoordenada.forEach(
        function (grupo) {
            const marcadorGBIF =
                L.circleMarker(
                    [
                        grupo.latitude,
                        grupo.longitude
                    ],
                    {
                        radius: 7,
                        color: "#9a4d00",
                        weight: 2,
                        fillColor: "#f28c28",
                        fillOpacity: 0.85
                    }
                ).addTo(camadaGBIF);

            marcadorGBIF.options.fonteRegistro =
                "gbif";

            const listaRegistros =
                grupo.registros
                    .map(function (
                        registro,
                        indice
                    ) {
                        const nomeRegistro =
                            registro.scientificName ||
                            nomeCientifico;

                        const localidade =
                            registro.locality ||
                            registro.stateProvince ||
                            registro.country ||
                            "Localidade não informada";

                        const instituicao =
                            registro.institutionCode ||
                            "Instituição não informada";

                        const numeroCatalogo =
                            registro.catalogNumber ||
                            "Número não informado";

                        const numeroIndividuos =
                            registro.individualCount ??
                            "Não informado";

                        return `
                            <div class="registro-popup">
                                <strong>
                                    Registro ${indice + 1}
                                </strong>

                                <br>
                                <strong>Identificação:</strong>
                                <em>${nomeRegistro}</em>

                                <br>
                                <strong>Localidade:</strong>
                                ${localidade}

                                <br>
                                <strong>Instituição:</strong>
                                ${instituicao}

                                <br>
                                <strong>Catálogo:</strong>
                                ${numeroCatalogo}

                                <br>
                                <strong>Indivíduos:</strong>
                                ${numeroIndividuos}
                            </div>
                        `;
                    })
                    .join("<hr>");

            vincularPopupOcorrencia(
            marcadorGBIF,`
                <strong>Registros do GBIF</strong>

                <br>
                <em>${nomeCientifico}</em>

                <br>
                <strong>
                    Registros neste ponto:
                </strong>

                ${grupo.registros.length}

                <hr>

                ${listaRegistros}
            `);
        }
    );

    if (
        !mapaEspecies.hasLayer(
            camadaGBIF
        )
    ) {
        camadaGBIF.addTo(
            mapaEspecies
        );
    }

    const limitesGBIF =
        camadaGBIF.getBounds();

    if (limitesGBIF.isValid()) {
        mapaEspecies.fitBounds(
            limitesGBIF,
            {
                padding: [30, 30],
                maxZoom: 8
            }
        );
    }

    return registrosPorCoordenada.size;
}

function atualizarResultadoGBIF(
    nomeCientifico,
    coordenadas
) {
    resultadosBancos.gbif = {
        encontrados:
            estadoGBIF.totalFonte,

        disponiveisMapa:
            estadoGBIF.totalMapa,

        carregados:
            estadoGBIF.registros.length,

        coordenadas: coordenadas,

        temMais:
            estadoGBIF.registros.length <
            estadoGBIF.totalMapa
    };

    atualizarIndicadores(
        resultadosBancos.gbif.encontrados,
        resultadosBancos.gbif.carregados,
        resultadosBancos.gbif.coordenadas
    );

    atualizarQuadroResultados(
        nomeCientifico
    );
}


async function buscarOcorrenciasGBIF(
    nomeCientifico
) {
    camadaGBIF.clearLayers();

    estadoGBIF = {
        nomeCientifico: nomeCientifico,
        taxonGBIF: null,
        totalFonte: 0,
        totalMapa: 0,
        registros: []
    };

    try {
        const taxonGBIF =
            await resolverTaxonGBIF(
                nomeCientifico
            );

        estadoGBIF.taxonGBIF =
            taxonGBIF;

        console.log(
            "Táxon reconhecido pelo GBIF:",
            taxonGBIF
        );

        const resultados =
            await Promise.all([
                obterJSONGBIF(
                    criarURLGBIFTotal(
                        nomeCientifico,
                        taxonGBIF
                    )
                ),

                obterJSONGBIF(
                    criarURLGBIFMapa(
                        nomeCientifico,
                        0,
                        300,
                        taxonGBIF
                    )
                )
            ]);

        const dadosTotal =
            resultados[0];

        const dadosMapa =
            resultados[1];

        estadoGBIF.totalFonte =
            Number(
                dadosTotal.count || 0
            );

        estadoGBIF.totalMapa =
            Number(
                dadosMapa.count || 0
            );

        estadoGBIF.registros =
            Array.isArray(
                dadosMapa.results
            )
                ? dadosMapa.results
                : [];

        const coordenadas =
            desenharRegistrosGBIF(
                nomeCientifico,
                estadoGBIF.registros
            );

        atualizarResultadoGBIF(
            nomeCientifico,
            coordenadas
        );
    } catch (erro) {
        resultadosBancos.gbif = {
            erro: true,
            encontrados: 0,
            disponiveisMapa: 0,
            carregados: 0,
            coordenadas: 0,
            temMais: false
        };

        atualizarIndicadores(
            0,
            0,
            0
        );

        atualizarQuadroResultados(
            nomeCientifico
        );

        console.error(
            "Erro na consulta ao GBIF:",
            erro
        );
    }
}

async function carregarTodosGBIF(
    nomeCientifico
) {
    if (
        estadoGBIF.nomeCientifico !==
        nomeCientifico
    ) {
        throw new Error(
            "A pesquisa atual do GBIF mudou."
        );
    }

    let offset =
        estadoGBIF.registros.length;

    while (
        offset <
        estadoGBIF.totalMapa
    ) {
        const dadosPagina =
            await obterJSONGBIF(
                criarURLGBIFMapa(
                    nomeCientifico,
                    offset,
                    300,
                    estadoGBIF.taxonGBIF
                )
            );

        const novosRegistros =
            Array.isArray(
                dadosPagina.results
            )
                ? dadosPagina.results
                : [];

        if (
            novosRegistros.length === 0
        ) {
            break;
        }

        estadoGBIF.registros.push(
            ...novosRegistros
        );

        offset +=
            novosRegistros.length;
    }

    const coordenadas =
        desenharRegistrosGBIF(
            nomeCientifico,
            estadoGBIF.registros
        );

    atualizarResultadoGBIF(
        nomeCientifico,
        coordenadas
    );
}

// INÍCIO DA BUSCA NO SPECIESLINK

let estadoSpeciesLink = {
    nomeCientifico: "",
    totalFonte: 0,
    totalMapa: 0,
    features: []
};

function criarURLSpeciesLinkTotal(
    nomeCientifico
) {
    const url = new URL(
        "https://specieslink.net/ws/1.0/search"
    );

    url.searchParams.set(
        "apikey",
        window.CONFIG.speciesLinkApiKey
    );

    url.searchParams.set(
        "scientificName",
        nomeCientifico
    );

    url.searchParams.set("scope", "a");
    url.searchParams.set("output", "dwc");
    url.searchParams.set("limit", "0");

    return url;
}

function criarURLSpeciesLinkMapa(
    nomeCientifico,
    offset = 0,
    limite = 300
) {
    const url = new URL(
        "https://specieslink.net/ws/1.0/search"
    );

    url.searchParams.set(
        "apikey",
        window.CONFIG.speciesLinkApiKey
    );

    url.searchParams.set(
        "scientificName",
        nomeCientifico
    );

    url.searchParams.set("scope", "a");
    url.searchParams.set("output", "dwc");

    url.searchParams.set(
        "coordinates",
        "original"
    );

    url.searchParams.set(
        "bbox",
        "-90 -57 -30 15"
    );

    url.searchParams.set(
        "limit",
        String(limite)
    );

    url.searchParams.set(
        "offset",
        String(offset)
    );

    return url;
}

async function obterJSONSpeciesLink(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(
            `Consulta speciesLink: HTTP ${resposta.status}`
        );
    }

    return resposta.json();
}



function obterCampoSpeciesLink(
    registro,
    ...nomesPossiveis
) {
    const normalizar = function (nome) {
        return nome
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    };

    const chaves =
        Object.keys(registro);

    for (const nome of nomesPossiveis) {
        const nomeNormalizado =
            normalizar(nome);

        const chaveEncontrada =
            chaves.find(function (chave) {
                const chaveNormalizada =
                    normalizar(chave);

                return (
                    chaveNormalizada ===
                        nomeNormalizado ||
                    chaveNormalizada.endsWith(
                        nomeNormalizado
                    )
                );
            });

        if (chaveEncontrada) {
            const valor =
                registro[chaveEncontrada];

            if (
                valor !== null &&
                valor !== undefined &&
                String(valor).trim() !== ""
            ) {
                return String(valor).trim();
            }
        }
    }

    return null;
}

function desenharRegistrosSpeciesLink(
    nomeCientifico,
    features
) {
    camadaSpeciesLink.clearLayers();

    const registrosPorCoordenada =
        new Map();

    let registrosCarregados = 0;

    features.forEach(function (feature) {
        if (
            !feature.geometry ||
            !feature.geometry.coordinates
        ) {
            return;
        }

        const longitude = Number(
            feature.geometry.coordinates[0]
        );

        const latitude = Number(
            feature.geometry.coordinates[1]
        );

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            return;
        }

        registrosCarregados++;

        const chaveCoordenada =
            latitude.toFixed(6) +
            "," +
            longitude.toFixed(6);

        if (
            !registrosPorCoordenada.has(
                chaveCoordenada
            )
        ) {
            registrosPorCoordenada.set(
                chaveCoordenada,
                {
                    latitude: latitude,
                    longitude: longitude,
                    registros: []
                }
            );
        }

        registrosPorCoordenada
            .get(chaveCoordenada)
            .registros
            .push(feature.properties || {});
    });

    registrosPorCoordenada.forEach(
        function (grupo) {
            const marcadorSpeciesLink =
                L.circleMarker(
                    [
                        grupo.latitude,
                        grupo.longitude
                    ],
                    {
                        radius: 7,
                        color: "#4b287d",
                        weight: 2,
                        fillColor: "#9b72cf",
                        fillOpacity: 0.85
                    }
                ).addTo(camadaSpeciesLink);

            marcadorSpeciesLink.options
                .fonteRegistro =
                    "speciesLink";

            const listaRegistros =
                grupo.registros
                    .map(function (
                        registro,
                        indice
                    ) {
                        const nomeRegistro =
                            obterCampoSpeciesLink(
                                registro,
                                "scientificName"
                            ) ||
                            nomeCientifico;

                        const localidade =
                            obterCampoSpeciesLink(
                                registro,
                                "locality",
                                "stateProvince",
                                "country"
                            ) ||
                            "Localidade não informada";

                        const instituicao =
                            obterCampoSpeciesLink(
                                registro,
                                "institutionCode",
                                "collectionCode"
                            ) ||
                            "Instituição não informada";

                        const numeroCatalogo =
                            obterCampoSpeciesLink(
                                registro,
                                "catalogNumber",
                                "catalog_number",
                                "catalognumber"
                            ) ||
                            "Número não informado";

                        const numeroIndividuos =
                            obterCampoSpeciesLink(
                                registro,
                                "individualCount"
                            ) ||
                            "Não informado";

                        return `
                            <div class="registro-popup">
                                <strong>
                                    Registro ${indice + 1}
                                </strong>

                                <br>
                                <strong>Identificação:</strong>
                                <em>${nomeRegistro}</em>

                                <br>
                                <strong>Localidade:</strong>
                                ${localidade}

                                <br>
                                <strong>Instituição:</strong>
                                ${instituicao}

                                <br>
                                <strong>Catálogo:</strong>
                                ${numeroCatalogo}

                                <br>
                                <strong>Indivíduos:</strong>
                                ${numeroIndividuos}
                            </div>
                        `;
                    })
                    .join("<hr>");

            marcadorSpeciesLink.bindPopup(`
                <strong>
                    Registros do speciesLink
                </strong>

                <br>
                <em>${nomeCientifico}</em>

                <br>
                <strong>
                    Registros neste ponto:
                </strong>

                ${grupo.registros.length}

                <hr>

                ${listaRegistros}
            `);
        }
    );

    if (
        !mapaEspecies.hasLayer(
            camadaSpeciesLink
        )
    ) {
        camadaSpeciesLink.addTo(
            mapaEspecies
        );
    }

    const limitesSpeciesLink =
        camadaSpeciesLink.getBounds();

    if (limitesSpeciesLink.isValid()) {
        mapaEspecies.fitBounds(
            limitesSpeciesLink,
            {
                padding: [35, 35],
                maxZoom: 8
            }
        );
    }

    return {
        carregados: registrosCarregados,
        coordenadas:
            registrosPorCoordenada.size
    };
}

function atualizarResultadoSpeciesLink(
    nomeCientifico,
    resumoMapa
) {
    resultadosBancos.speciesLink = {
        encontrados:
            estadoSpeciesLink.totalFonte,

        disponiveisMapa:
            estadoSpeciesLink.totalMapa,

        carregados:
            resumoMapa.carregados,

        coordenadas:
            resumoMapa.coordenadas,

        temMais:
            estadoSpeciesLink.features.length <
            estadoSpeciesLink.totalMapa
    };

    atualizarIndicadoresSpeciesLink(
        resultadosBancos.speciesLink.encontrados,
        resultadosBancos.speciesLink.carregados,
        resultadosBancos.speciesLink.coordenadas
    );

    atualizarQuadroResultados(
        nomeCientifico
    );
}


async function buscarOcorrenciasSpeciesLink(
    nomeCientifico
) {
    camadaSpeciesLink.clearLayers();

    estadoSpeciesLink = {
        nomeCientifico: nomeCientifico,
        totalFonte: 0,
        totalMapa: 0,
        features: []
    };

    try {
        const resultados =
            await Promise.all([
                obterJSONSpeciesLink(
                    criarURLSpeciesLinkTotal(
                        nomeCientifico
                    )
                ),

                obterJSONSpeciesLink(
                    criarURLSpeciesLinkMapa(
                        nomeCientifico,
                        0,
                        300
                    )
                )
            ]);

        const dadosTotal =
            resultados[0];

        const dadosMapa =
            resultados[1];

        estadoSpeciesLink.totalFonte =
            Number(
                dadosTotal.numberMatched || 0
            );

        estadoSpeciesLink.totalMapa =
            Number(
                dadosMapa.numberMatched || 0
            );

        estadoSpeciesLink.features =
            Array.isArray(dadosMapa.features)
                ? dadosMapa.features
                : [];

        const resumoMapa =
            desenharRegistrosSpeciesLink(
                nomeCientifico,
                estadoSpeciesLink.features
            );

        atualizarResultadoSpeciesLink(
            nomeCientifico,
            resumoMapa
        );

        console.log(
            "speciesLink:",
            resultadosBancos.speciesLink
        );
    } catch (erro) {
        resultadosBancos.speciesLink = {
            erro: true,
            encontrados: 0,
            disponiveisMapa: 0,
            carregados: 0,
            coordenadas: 0,
            temMais: false
        };

        atualizarIndicadoresSpeciesLink(
            0,
            0,
            0
        );

        atualizarQuadroResultados(
            nomeCientifico
        );

        console.error(
            "Erro na consulta ao speciesLink:",
            erro
        );
    }
}

async function carregarTodosSpeciesLink(
    nomeCientifico
) {
    if (
        estadoSpeciesLink.nomeCientifico !==
        nomeCientifico
    ) {
        throw new Error(
            "A pesquisa atual do speciesLink mudou."
        );
    }

    let offset =
        estadoSpeciesLink.features.length;

    while (
        offset <
        estadoSpeciesLink.totalMapa
    ) {
        const dadosPagina =
            await obterJSONSpeciesLink(
                criarURLSpeciesLinkMapa(
                    nomeCientifico,
                    offset,
                    300
                )
            );

        const novasFeatures =
            Array.isArray(
                dadosPagina.features
            )
                ? dadosPagina.features
                : [];

        if (
            novasFeatures.length === 0
        ) {
            break;
        }

        estadoSpeciesLink.features.push(
            ...novasFeatures
        );

        offset +=
            novasFeatures.length;
    }

    const resumoMapa =
        desenharRegistrosSpeciesLink(
            nomeCientifico,
            estadoSpeciesLink.features
        );

    atualizarResultadoSpeciesLink(
        nomeCientifico,
        resumoMapa
    );
}


// FIM DA BUSCA NO SPECIESLINK

function converterCSVFishNet2(textoCSV) {
    const linhas = [];

    let linhaAtual = [];
    let campoAtual = "";
    let dentroDeAspas = false;

    for (
        let indice = 0;
        indice < textoCSV.length;
        indice++
    ) {
        const caractere = textoCSV[indice];
        const proximoCaractere =
            textoCSV[indice + 1];

        if (caractere === '"') {
            if (
                dentroDeAspas &&
                proximoCaractere === '"'
            ) {
                campoAtual += '"';
                indice++;
            } else {
                dentroDeAspas =
                    !dentroDeAspas;
            }

            continue;
        }

        if (
            caractere === "," &&
            !dentroDeAspas
        ) {
            linhaAtual.push(campoAtual);
            campoAtual = "";
            continue;
        }

        if (
            (
                caractere === "\n" ||
                caractere === "\r"
            ) &&
            !dentroDeAspas
        ) {
            if (
                caractere === "\r" &&
                proximoCaractere === "\n"
            ) {
                indice++;
            }

            linhaAtual.push(campoAtual);

            if (
                linhaAtual.some(function (valor) {
                    return valor.trim() !== "";
                })
            ) {
                linhas.push(linhaAtual);
            }

            linhaAtual = [];
            campoAtual = "";
            continue;
        }

        campoAtual += caractere;
    }

    if (
        campoAtual !== "" ||
        linhaAtual.length > 0
    ) {
        linhaAtual.push(campoAtual);
        linhas.push(linhaAtual);
    }

    if (linhas.length === 0) {
        return [];
    }

    const cabecalhos = linhas
        .shift()
        .map(function (cabecalho) {
            return cabecalho
                .replace(/^\uFEFF/, "")
                .trim();
        });

    return linhas.map(function (linha) {
        const registro = {};

        cabecalhos.forEach(function (
            cabecalho,
            indice
        ) {
            registro[cabecalho] =
                linha[indice] ?? "";
        });

        return registro;
    });
}


// INÍCIO DA BUSCA NO FISHNET2

let estadoFishNet2 = {
    nomeCientifico: "",
    totalFonte: 0,
    registros: [],
    paginaAtual: 0,
    todasPaginasCarregadas: false
};

const urlBaseFishNet2 =
    "https://fishnet2.net/api/v1";

async function obterTokenFishNet2() {
    const resposta = await fetch(
        `${urlBaseFishNet2}/clients`
    );

    if (!resposta.ok) {
        throw new Error(
            `Token FishNet2: HTTP ${resposta.status}`
        );
    }

    const dados = await resposta.json();

    if (!dados.token) {
        throw new Error(
            "O FishNet2 não forneceu o token temporário."
        );
    }

    return dados.token;
}

function criarURLTotalFishNet2(
    nomeCientifico
) {
    const url = new URL(
        `${urlBaseFishNet2}/taxa/`
    );

    url.searchParams.set(
        "t",
        nomeCientifico
    );

    return url;
}

function criarURLPaginaFishNet2(
    nomeCientifico,
    pagina,
    limite = 300
) {
    const url = new URL(
        `${urlBaseFishNet2}/occurrence/`
    );

    url.searchParams.set(
        "t",
        nomeCientifico
    );

    url.searchParams.set(
        "num",
        String(limite)
    );

    url.searchParams.set(
        "set",
        String(pagina)
    );

    return url;
}

async function obterTextoFishNet2(
    url,
    token
) {
    const resposta = await fetch(
        url,
        {
            headers: {
                Accept: "text/csv",

                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    if (!resposta.ok) {
        throw new Error(
            `Consulta FishNet2: HTTP ${resposta.status}`
        );
    }

    return resposta.text();
}

function calcularTotalFishNet2(
    textoTaxa
) {
    const resumoTaxonomico =
        converterCSVFishNet2(
            textoTaxa
        );

    return resumoTaxonomico.reduce(
        function (total, registro) {
            const quantidade = Number(
                registro.NumRecords ||
                registro.numRecords ||
                registro.numrecords ||
                0
            );

            return Number.isFinite(quantidade)
                ? total + quantidade
                : total;
        },
        0
    );
}

function desenharRegistrosFishNet2(
    nomeCientifico,
    registros
) {
    camadaFishNet2.clearLayers();

    const registrosPorCoordenada =
        new Map();

    let registrosCarregados = 0;

    registros.forEach(function (registro) {
        const latitude = Number(
            registro.Latitude ??
            registro.latitude ??
            registro.DecimalLatitude ??
            registro.decimalLatitude
        );

        const longitude = Number(
            registro.Longitude ??
            registro.longitude ??
            registro.DecimalLongitude ??
            registro.decimalLongitude
        );

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -57 ||
            latitude > 15 ||
            longitude < -90 ||
            longitude > -30
        ) {
            return;
        }

        registrosCarregados++;

        const chaveCoordenada =
            latitude.toFixed(6) +
            "," +
            longitude.toFixed(6);

        if (
            !registrosPorCoordenada.has(
                chaveCoordenada
            )
        ) {
            registrosPorCoordenada.set(
                chaveCoordenada,
                {
                    latitude: latitude,
                    longitude: longitude,
                    registros: []
                }
            );
        }

        registrosPorCoordenada
            .get(chaveCoordenada)
            .registros
            .push(registro);
    });

    registrosPorCoordenada.forEach(
        function (grupo) {
            const marcadorFishNet2 =
                L.circleMarker(
                    [
                        grupo.latitude,
                        grupo.longitude
                    ],
                    {
                        radius: 7,
                        color: "#8b1a1a",
                        weight: 2,
                        fillColor: "#e53935",
                        fillOpacity: 0.85
                    }
                ).addTo(camadaFishNet2);

            marcadorFishNet2.options
                .fonteRegistro =
                    "fishNet2";

            const listaRegistros =
                grupo.registros
                    .map(function (
                        registro,
                        indice
                    ) {
                        const nomeRegistro =
                            registro.ScientificName ||
                            nomeCientifico;

                        const localidade =
                            registro.Locality ||
                            registro.County ||
                            registro.StateProvince ||
                            registro.Country ||
                            "Localidade não informada";

                        const instituicao =
                            registro.InstitutionCode ||
                            registro.CollectionCode ||
                            "Instituição não informada";

                        const numeroCatalogo =
                            registro.CatalogNumber ||
                            "Número não informado";

                        const numeroIndividuos =
                            registro.IndividualCount ||
                            "Não informado";

                        return `
                            <div class="registro-popup">
                                <strong>
                                    Registro ${indice + 1}
                                </strong>

                                <br>
                                <strong>Identificação:</strong>
                                <em>${nomeRegistro}</em>

                                <br>
                                <strong>Localidade:</strong>
                                ${localidade}

                                <br>
                                <strong>Instituição:</strong>
                                ${instituicao}

                                <br>
                                <strong>Catálogo:</strong>
                                ${numeroCatalogo}

                                <br>
                                <strong>Indivíduos:</strong>
                                ${numeroIndividuos}
                            </div>
                        `;
                    })
                    .join("<hr>");

            marcadorFishNet2.bindPopup(`
                <strong>
                    Registros do FishNet2
                </strong>

                <br>
                <em>${nomeCientifico}</em>

                <br>
                <strong>
                    Registros neste ponto:
                </strong>

                ${grupo.registros.length}

                <hr>

                ${listaRegistros}
            `);
        }
    );

    if (
        !mapaEspecies.hasLayer(
            camadaFishNet2
        )
    ) {
        camadaFishNet2.addTo(
            mapaEspecies
        );
    }

    return {
        carregados: registrosCarregados,

        coordenadas:
            registrosPorCoordenada.size
    };
}

function atualizarResultadoFishNet2(
    nomeCientifico,
    resumoMapa
) {
    const totalDisponivelMapa =
        estadoFishNet2.todasPaginasCarregadas
            ? resumoMapa.carregados
            : null;

    resultadosBancos.fishNet2 = {
        encontrados:
            estadoFishNet2.totalFonte,

        disponiveisMapa:
            totalDisponivelMapa,

        carregados:
            resumoMapa.carregados,

        coordenadas:
            resumoMapa.coordenadas,

        temMais:
            !estadoFishNet2
                .todasPaginasCarregadas
    };

    atualizarIndicadoresFishNet2(
        resultadosBancos.fishNet2.encontrados,
        resultadosBancos.fishNet2.carregados,
        resultadosBancos.fishNet2.coordenadas
    );

    atualizarQuadroResultados(
        nomeCientifico
    );
}

async function buscarOcorrenciasFishNet2(
    nomeCientifico
) {
    camadaFishNet2.clearLayers();

    estadoFishNet2 = {
        nomeCientifico: nomeCientifico,
        totalFonte: 0,
        registros: [],
        paginaAtual: 0,
        todasPaginasCarregadas: false
    };

    try {
        const token =
            await obterTokenFishNet2();

        const resultados =
            await Promise.all([
                obterTextoFishNet2(
                    criarURLTotalFishNet2(
                        nomeCientifico
                    ),
                    token
                ),

                obterTextoFishNet2(
                    criarURLPaginaFishNet2(
                        nomeCientifico,
                        1,
                        300
                    ),
                    token
                )
            ]);

        const textoTotal =
            resultados[0];

        const textoPrimeiraPagina =
            resultados[1];

        const totalCalculado =
            calcularTotalFishNet2(
                textoTotal
            );

        const registrosPrimeiraPagina =
            converterCSVFishNet2(
                textoPrimeiraPagina
            );

        estadoFishNet2.totalFonte =
            Math.max(
                totalCalculado,
                registrosPrimeiraPagina.length
            );

        estadoFishNet2.registros =
            registrosPrimeiraPagina;

        estadoFishNet2.paginaAtual = 1;

        estadoFishNet2
            .todasPaginasCarregadas =
                registrosPrimeiraPagina.length <
                    300 ||
                registrosPrimeiraPagina.length >=
                    estadoFishNet2.totalFonte;

        const resumoMapa =
            desenharRegistrosFishNet2(
                nomeCientifico,
                estadoFishNet2.registros
            );

        atualizarResultadoFishNet2(
            nomeCientifico,
            resumoMapa
        );

        await atualizarCoresDosRegistros();

        console.log(
            "FishNet2:",
            resultadosBancos.fishNet2
        );
    } catch (erro) {
        resultadosBancos.fishNet2 = {
            erro: true,
            encontrados: 0,
            disponiveisMapa: 0,
            carregados: 0,
            coordenadas: 0,
            temMais: false
        };

        atualizarIndicadoresFishNet2(
            0,
            0,
            0
        );

        atualizarQuadroResultados(
            nomeCientifico
        );

        console.error(
            "Erro na consulta ao FishNet2:",
            erro
        );
    }
}

async function carregarTodosFishNet2(
    nomeCientifico
) {
    if (
        estadoFishNet2.nomeCientifico !==
        nomeCientifico
    ) {
        throw new Error(
            "A pesquisa atual do FishNet2 mudou."
        );
    }

    const token =
        await obterTokenFishNet2();

    while (
        estadoFishNet2.registros.length <
        estadoFishNet2.totalFonte
    ) {
        const proximaPagina =
            estadoFishNet2.paginaAtual + 1;

        const textoPagina =
            await obterTextoFishNet2(
                criarURLPaginaFishNet2(
                    nomeCientifico,
                    proximaPagina,
                    300
                ),
                token
            );

        const novosRegistros =
            converterCSVFishNet2(
                textoPagina
            );

        if (
            novosRegistros.length === 0
        ) {
            estadoFishNet2
                .todasPaginasCarregadas =
                    true;

            break;
        }

        estadoFishNet2.registros.push(
            ...novosRegistros
        );

        estadoFishNet2.paginaAtual =
            proximaPagina;

        if (
            novosRegistros.length < 300
        ) {
            estadoFishNet2
                .todasPaginasCarregadas =
                    true;

            break;
        }
    }

    if (
        estadoFishNet2.registros.length >=
        estadoFishNet2.totalFonte
    ) {
        estadoFishNet2
            .todasPaginasCarregadas =
                true;
    }

    const resumoMapa =
        desenharRegistrosFishNet2(
            nomeCientifico,
            estadoFishNet2.registros
        );

    atualizarResultadoFishNet2(
        nomeCientifico,
        resumoMapa
    );

    await atualizarCoresDosRegistros();
}

// FIM DA BUSCA NO FISHNET2


// =====================================================
// BUSCA DIRETA NO PLAZI TREATMENTBANK
// =====================================================

let estadoPlazi = {
    nomeCientifico: "",
    totalTratamentos: 0,
    totalMateriais: 0,
    materiaisDisponiveis: true,
    urlTratamentos: "",
    registros: []
};

function separarNomePlazi(nomeCientifico) {
    const partes = String(nomeCientifico || "")
        .trim()
        .split(/\s+/);

    if (partes.length < 2) {
        throw new Error(
            "O Plazi requer um nome binomial completo."
        );
    }

    return {
        genero: partes[0],
        especie: partes[1]
    };
}

function escaparHTMLPlazi(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function obterURLSeguraPlazi(valor) {
    if (!valor) {
        return null;
    }

    try {
        const url = new URL(String(valor));

        return ["http:", "https:"].includes(
            url.protocol
        )
            ? url.toString()
            : null;
    } catch (erro) {
        return null;
    }
}

function criarLinkPlazi(url, rotulo) {
    const urlSegura = obterURLSeguraPlazi(url);

    if (!urlSegura) {
        return "";
    }

    return `
        <a
            href="${escaparHTMLPlazi(urlSegura)}"
            target="_blank"
            rel="noopener noreferrer"
        >${escaparHTMLPlazi(rotulo)}</a>
    `;
}

async function obterDadosPlazi(
    nomeCientifico,
    limite = 300
) {
    const nomes =
        separarNomePlazi(nomeCientifico);

    const enderecoProxy =
        window.CONFIG?.plaziProxyUrl;

    if (!enderecoProxy) {
        throw new Error(
            "Endereço do serviço Plazi não configurado."
        );
    }

    const url = new URL(enderecoProxy);

    url.searchParams.set(
        "genus",
        nomes.genero
    );

    url.searchParams.set(
        "species",
        nomes.especie
    );

    url.searchParams.set(
        "limit",
        String(limite)
    );

    const controlador = new AbortController();
    const temporizador = setTimeout(
        function () {
            controlador.abort();
        },
        90000
    );

    try {
        const resposta = await fetch(
            url,
            {
                signal: controlador.signal,
                cache: "no-store",
                headers: {
                    Accept: "application/json"
                }
            }
        );

        if (!resposta.ok) {
            throw new Error(
                `Consulta Plazi: HTTP ${resposta.status}`
            );
        }

        return await resposta.json();
    } finally {
        clearTimeout(temporizador);
    }
}

function desenharRegistrosPlazi(
    nomeCientifico,
    registros
) {
    camadaPlazi.clearLayers();

    const registrosPorCoordenada =
        new Map();

    let registrosCarregados = 0;

    registros.forEach(function (registro) {
        const latitude = Number(
            registro.MatCitLatitude
        );

        const longitude = Number(
            registro.MatCitLongitude
        );

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -57 ||
            latitude > 15 ||
            longitude < -90 ||
            longitude > -30
        ) {
            return;
        }

        registrosCarregados++;

        const chaveCoordenada =
            latitude.toFixed(6) +
            "," +
            longitude.toFixed(6);

        if (
            !registrosPorCoordenada.has(
                chaveCoordenada
            )
        ) {
            registrosPorCoordenada.set(
                chaveCoordenada,
                {
                    latitude: latitude,
                    longitude: longitude,
                    registros: []
                }
            );
        }

        registrosPorCoordenada
            .get(chaveCoordenada)
            .registros
            .push(registro);
    });

    registrosPorCoordenada.forEach(
        function (grupo) {
            const marcadorPlazi =
                L.circleMarker(
                    [
                        grupo.latitude,
                        grupo.longitude
                    ],
                    {
                        radius: 7,
                        color: "#005f56",
                        weight: 2,
                        fillColor: "#00897b",
                        fillOpacity: 0.88
                    }
                ).addTo(camadaPlazi);

            marcadorPlazi.options
                .fonteRegistro = "plazi";

            const listaRegistros =
                grupo.registros
                    .map(function (
                        registro,
                        indice
                    ) {
                        const identificacao =
                            registro.TaxName ||
                            nomeCientifico;

                        const localidade = [
                            registro.MatCitLocation,
                            registro.MatCitMunicipality,
                            registro.MatCitRegion,
                            registro.MatCitCountry
                        ]
                            .filter(Boolean)
                            .join(", ") ||
                            "Localidade não informada";

                        const colecao =
                            registro.MatCitCollectionCode ||
                            "Coleção não informada";

                        const catalogo =
                            registro.MatCitSpecimenCode ||
                            "Número não informado";

                        const tipo =
                            registro.MatCitTypeStatus ||
                            "Não informado";

                        const citacaoMaterial =
                            registro.MatCitVerbatimMatCit ||
                            "Citação não informada";

                        const referencia =
                            registro.BibDspRefDsp ||
                            registro.BibTitle ||
                            "Referência não informada";

                        const tratamento =
                            criarLinkPlazi(
                                registro.LnkHttpUri,
                                "Ver tratamento no Plazi"
                            );

                        const doiBruto =
                            String(
                                registro.PubLnkArticleDoi ||
                                ""
                            ).replace(
                                /^https?:\/\/(dx\.)?doi\.org\//i,
                                ""
                            );

                        const linkDoi = doiBruto
                            ? criarLinkPlazi(
                                `https://doi.org/${doiBruto}`,
                                "Abrir artigo pelo DOI"
                            )
                            : "";

                        const links = [
                            tratamento,
                            linkDoi
                        ]
                            .filter(Boolean)
                            .join("<br>");

                        return `
                            <div class="registro-popup registro-popup-plazi">
                                <strong>
                                    Registro ${indice + 1}
                                </strong>

                                <br>
                                <strong>Identificação:</strong>
                                <em>${escaparHTMLPlazi(identificacao)}</em>

                                <br>
                                <strong>Status do material:</strong>
                                ${escaparHTMLPlazi(tipo)}

                                <br>
                                <strong>Localidade:</strong>
                                ${escaparHTMLPlazi(localidade)}

                                <br>
                                <strong>Coleção:</strong>
                                ${escaparHTMLPlazi(colecao)}

                                <br>
                                <strong>Catálogo:</strong>
                                ${escaparHTMLPlazi(catalogo)}

                                <br>
                                <strong>Citação do material:</strong>
                                ${escaparHTMLPlazi(citacaoMaterial)}

                                <br>
                                <strong>Referência:</strong>
                                ${escaparHTMLPlazi(referencia)}

                                ${links ? `<br>${links}` : ""}
                            </div>
                        `;
                    })
                    .join("<hr>");

            vincularPopupOcorrencia(
                marcadorPlazi,
                `
                    <strong>
                        Registros do Plazi — literatura
                    </strong>

                    <br>
                    <em>${escaparHTMLPlazi(nomeCientifico)}</em>

                    <br>
                    <strong>
                        Registros neste ponto:
                    </strong>

                    ${grupo.registros.length}

                    <hr>

                    ${listaRegistros}
                `
            );
        }
    );

    if (
        !mapaEspecies.hasLayer(camadaPlazi)
    ) {
        camadaPlazi.addTo(mapaEspecies);
    }

    return {
        carregados: registrosCarregados,
        coordenadas:
            registrosPorCoordenada.size
    };
}

function atualizarResultadoPlazi(
    nomeCientifico,
    resumoMapa
) {
    const todosRecebidos =
        estadoPlazi.materiaisDisponiveis &&
        estadoPlazi.registros.length >=
            estadoPlazi.totalMateriais;

    resultadosBancos.plazi = {
        tratamentos:
            estadoPlazi.totalTratamentos,

        materiais:
            estadoPlazi.totalMateriais,

        materiaisDisponiveis:
            estadoPlazi.materiaisDisponiveis,

        encontrados:
            estadoPlazi.totalMateriais,

        urlTratamentos:
            estadoPlazi.urlTratamentos,

        disponiveisMapa:
            estadoPlazi.materiaisDisponiveis &&
            todosRecebidos
                ? resumoMapa.carregados
                : null,

        carregados:
            estadoPlazi.materiaisDisponiveis
                ? resumoMapa.carregados
                : null,

        coordenadas:
            estadoPlazi.materiaisDisponiveis
                ? resumoMapa.coordenadas
                : null,

        temMais:
            estadoPlazi.materiaisDisponiveis &&
            !todosRecebidos
    };

    atualizarIndicadoresPlazi(
        resultadosBancos.plazi.tratamentos,
        resultadosBancos.plazi.materiais,
        resultadosBancos.plazi.carregados
    );

    atualizarQuadroResultados(
        nomeCientifico
    );
}

async function buscarOcorrenciasPlazi(
    nomeCientifico
) {
    camadaPlazi.clearLayers();

    estadoPlazi = {
        nomeCientifico: nomeCientifico,
        totalTratamentos: 0,
        totalMateriais: 0,
        materiaisDisponiveis: true,
        urlTratamentos: "",
        registros: []
    };

    try {
        const nomeDaConsulta =
            nomeCientifico;

        const dados =
            await obterDadosPlazi(
                nomeCientifico,
                300
            );

        if (
            estadoPlazi.nomeCientifico !==
            nomeDaConsulta
        ) {
            return;
        }

        estadoPlazi.totalTratamentos =
            Number(dados.treatmentsTotal || 0);

        estadoPlazi.materiaisDisponiveis =
            dados.materialsAvailable !== false;

        estadoPlazi.totalMateriais =
            estadoPlazi.materiaisDisponiveis
                ? Number(
                    dados.materialCitationsTotal ??
                    dados.total ??
                    0
                )
                : null;

        estadoPlazi.urlTratamentos =
            String(dados.treatmentsUrl || "");

        estadoPlazi.registros =
            Array.isArray(dados.records)
                ? dados.records
                : [];

        const resumoMapa =
            desenharRegistrosPlazi(
                nomeCientifico,
                estadoPlazi.registros
            );

        atualizarResultadoPlazi(
            nomeCientifico,
            resumoMapa
        );

        try {
            await atualizarCoresDosRegistros();
        } catch (erroVisual) {
            console.error(
                "Erro ao atualizar a aparência dos registros:",
                erroVisual
            );
        }

        console.log(
            "Plazi:",
            resultadosBancos.plazi
        );
    } catch (erro) {
        resultadosBancos.plazi = {
            erro: true,
            tratamentos: 0,
            materiais: 0,
            materiaisDisponiveis: false,
            encontrados: 0,
            disponiveisMapa: 0,
            carregados: 0,
            coordenadas: 0,
            temMais: false
        };

        atualizarIndicadoresPlazi(0, 0, 0);

        atualizarQuadroResultados(
            nomeCientifico
        );

        console.error(
            "Erro na consulta ao Plazi:",
            erro
        );
    }
}

async function carregarTodosPlazi(
    nomeCientifico
) {
    if (
        estadoPlazi.nomeCientifico !==
        nomeCientifico
    ) {
        throw new Error(
            "A pesquisa atual do Plazi mudou."
        );
    }

    const dados = await obterDadosPlazi(
        nomeCientifico,
        Math.max(
            estadoPlazi.totalMateriais,
            300
        )
    );

    estadoPlazi.totalTratamentos =
        Number(dados.treatmentsTotal || 0);

    estadoPlazi.materiaisDisponiveis =
        dados.materialsAvailable !== false;

    estadoPlazi.totalMateriais =
        estadoPlazi.materiaisDisponiveis
            ? Number(
                dados.materialCitationsTotal ??
                dados.total ??
                0
            )
            : null;

    estadoPlazi.urlTratamentos =
        String(dados.treatmentsUrl || "");

    estadoPlazi.registros =
        Array.isArray(dados.records)
            ? dados.records
            : [];

    const resumoMapa =
        desenharRegistrosPlazi(
            nomeCientifico,
            estadoPlazi.registros
        );

    atualizarResultadoPlazi(
        nomeCientifico,
        resumoMapa
    );

    await atualizarCoresDosRegistros();
}

// FIM DA BUSCA NO PLAZI


// FIM DA BUSCA GERAL NO GBIF

// Registros originais importados pelo pesquisador.
let dadosCSVImportados = [];

const filtroGeneroCSV =
    document.querySelector("#filtro-genero-csv");

const filtroEspecieCSV =
    document.querySelector("#filtro-especie-csv");

const quantidadeRegistrosFiltrados =
    document.querySelector("#quantidade-registros-filtrados");

const quantidadeTotalRegistros =
    document.querySelector("#quantidade-total-registros");

const botaoLimparFiltroCSV =
    document.querySelector("#botao-limpar-filtro-csv");

    // =====================================================
// PREPARAÇÃO DO FILTRO DO CSV
// =====================================================

function obterGenero(nomeEspecie) {
    return String(nomeEspecie || "")
        .trim()
        .split(/\s+/)[0];
}

function ordenarNomes(lista) {
    return lista.sort(function (nomeA, nomeB) {
        return nomeA.localeCompare(
            nomeB,
            "pt-BR",
            { sensitivity: "base" }
        );
    });
}

function preencherFiltroGenero() {
    const generos = new Set();

    dadosCSVImportados.forEach(function (registro) {
        const genero = obterGenero(registro.species);

        if (genero) {
            generos.add(genero);
        }
    });

    filtroGeneroCSV.innerHTML = `
        <option value="">Todos os gêneros</option>
    `;

    ordenarNomes([...generos]).forEach(function (genero) {
        const opcao = document.createElement("option");

        opcao.value = genero;
        opcao.textContent = genero;

        filtroGeneroCSV.appendChild(opcao);
    });
}

function preencherFiltroEspecie(generoSelecionado = "") {
    const especies = new Set();

    dadosCSVImportados.forEach(function (registro) {
        const especie = String(
            registro.species || ""
        ).trim();

        const genero = obterGenero(especie);

        if (
            especie &&
            (
                generoSelecionado === "" ||
                genero === generoSelecionado
            )
        ) {
            especies.add(especie);
        }
    });

    filtroEspecieCSV.innerHTML = `
        <option value="">Todas as espécies</option>
    `;

    ordenarNomes([...especies]).forEach(function (especie) {
        const opcao = document.createElement("option");

        opcao.value = especie;
        opcao.textContent = especie;

        filtroEspecieCSV.appendChild(opcao);
    });
}

function atualizarResumoFiltroCSV() {
    quantidadeRegistrosFiltrados.textContent =
        dadosCSVFiltrados.length.toLocaleString("pt-BR");

    quantidadeTotalRegistros.textContent =
       dadosCSVImportados.length.toLocaleString("pt-BR");

    quantidadeRegistrosAltitude.textContent =
        dadosCSVFiltrados.length.toLocaleString("pt-BR");

    botaoLimparFiltroCSV.disabled =
        filtroGeneroCSV.value === "" &&
        filtroEspecieCSV.value === "";

    botaoExtrairAltitude.disabled =
        dadosCSVFiltrados.length === 0;

    // Uma nova seleção ainda não possui altitudes extraídas.
    dadosCSVComAltitude = [];
    botaoBaixarAltitude.disabled = true;

    resultadoExtracaoAltitude.textContent =
        dadosCSVFiltrados.length > 0
            ? `${dadosCSVFiltrados.length.toLocaleString("pt-BR")} registros selecionados para a extração.`
            : "Nenhum registro corresponde ao filtro selecionado.";
}

// Registros que correspondem ao filtro atual.
let dadosCSVFiltrados = [];

// Registros após a extração das altitudes.
let dadosCSVComAltitude = [];

// Cabeçalhos do arquivo original.
let cabecalhosCSVImportado = [];


// Elementos da ferramenta de extração de altitude.
const quantidadeRegistrosAltitude =
    document.querySelector("#quantidade-registros-altitude");

const botaoExtrairAltitude =
    document.querySelector("#botao-extrair-altitude");

const botaoBaixarAltitude =
    document.querySelector("#botao-baixar-altitude");

const resultadoExtracaoAltitude =
    document.querySelector("#resultado-extracao-altitude");

const painelFiltroCSV =
    document.querySelector("#painel-filtro-csv");





// INÍCIO DA IMPORTAÇÃO DE CSV

const campoArquivoCSV =
    document.querySelector("#arquivo-csv");

const botaoImportarCSV =
    document.querySelector("#botao-importar-csv");



const botaoRemoverCSV =
    document.querySelector("#botao-remover-csv");

    painelFiltroCSV.hidden = false;

const resultadoImportacao =
    document.querySelector("#resultado-importacao");

botaoImportarCSV.addEventListener("click", function () {
    const arquivo = campoArquivoCSV.files[0];

    if (!arquivo) {
        resultadoImportacao.textContent =
            "Selecione um arquivo CSV primeiro.";
        return;
    }

    resultadoImportacao.textContent =
        "Lendo o arquivo...";

    const leitor = new FileReader();

    leitor.onload = function (evento) {
        const conteudoCSV = evento.target.result;

        const linhas = conteudoCSV
            .trim()
            .split(/\r?\n/);

        if (linhas.length < 2) {
            resultadoImportacao.textContent =
                "O arquivo não contém registros.";
            return;
        }

        const separador =
            linhas[0].includes(";") ? ";" : ",";

        const cabecalhos = linhas[0]
    .split(separador)
    .map(function (cabecalho) {
        return cabecalho
            .trim()
            .replace(/^\uFEFF/, "")
            .replace(/^["']|["']$/g, "");
    });

    // Reinicia os dados de uma importação anterior.
dadosCSVImportados = [];
dadosCSVComAltitude = [];
cabecalhosCSVImportado = [...cabecalhos];


        const indiceEspecie =
            cabecalhos.indexOf("species");

        const indiceLongitude =
            cabecalhos.indexOf("decimalLongitude");

        const indiceLatitude =
            cabecalhos.indexOf("decimalLatitude");

        if (
            indiceEspecie === -1 ||
            indiceLongitude === -1 ||
            indiceLatitude === -1
        ) {
            resultadoImportacao.textContent =
                "Colunas obrigatórias não encontradas. " +
                "Verifique se o arquivo possui species, " +
                "decimalLongitude e decimalLatitude.";
            return;
        }

        camadaDadosUsuario.clearLayers();

        let registrosAdicionados = 0;
let registrosIgnorados = 0;
let semNomeEspecie = 0;
let coordenadasAusentes = 0;
let coordenadasForaDoLimite = 0;

const especiesImportadas = new Set();

const coordenadasImportadas = new Set();
        for (
            let indice = 1;
            indice < linhas.length;
            indice++
        ) {
            if (!linhas[indice].trim()) {
                continue;
            }

            const colunas =
                linhas[indice].split(separador);

            const nomeEspecie = colunas[indiceEspecie]
                ?.trim()
                .replace(/^["']|["']$/g, "")
                .replaceAll("_", " ");

            const longitude = Number(
                colunas[indiceLongitude]?.trim()
            );

            const latitude = Number(
                colunas[indiceLatitude]?.trim()
            );

            if (!nomeEspecie) {
    semNomeEspecie++;
    registrosIgnorados++;
    continue;
}

if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
) {
    coordenadasAusentes++;
    registrosIgnorados++;
    continue;
}

if (
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
) {
    coordenadasForaDoLimite++;
    registrosIgnorados++;
    continue;
}

const chaveCoordenada =
    latitude.toFixed(6) +
    "," +
    longitude.toFixed(6);

coordenadasImportadas.add(chaveCoordenada);




especiesImportadas.add(nomeEspecie);

// Preserva todas as colunas originais desta linha.
const registroOriginal = {};

cabecalhos.forEach(function (cabecalho, indiceColuna) {
    registroOriginal[cabecalho] =
        colunas[indiceColuna]
            ?.trim()
            .replace(/^["']|["']$/g, "") ?? "";
});

// Padroniza os três campos utilizados pela plataforma.
registroOriginal.species = nomeEspecie;
registroOriginal.decimalLongitude = longitude;
registroOriginal.decimalLatitude = latitude;

dadosCSVImportados.push(registroOriginal);


            const marcadorUsuario = L.circleMarker(
    [latitude, longitude],
    {
        radius: 5,
        color: "#174f78",
        weight: 1,
        fillColor: "#3b8fc2",
        fillOpacity: 0.75
    }
).addTo(camadaDadosUsuario);

            marcadorUsuario.bindPopup(`
                <strong>Registro importado</strong>
                <br><em>${nomeEspecie}</em>
                <br><strong>Latitude:</strong>
                ${latitude}
                <br><strong>Longitude:</strong>
                ${longitude}
            `);

            registrosAdicionados++;
        }
atualizarIndicadoresDadosProprios(
    registrosAdicionados,
    especiesImportadas.size,
    coordenadasImportadas.size
);
       resultadoImportacao.innerHTML = `
    <strong>Importação concluída</strong><br>
    ${registrosAdicionados} registros válidos<br>
    ${especiesImportadas.size} espécies<br>
    ${registrosIgnorados} registros ignorados
    ${
        registrosIgnorados > 0
            ? `
                <br><small>
                    Sem nome da espécie: ${semNomeEspecie}<br>
                    Coordenadas ausentes ou inválidas:
                    ${coordenadasAusentes}<br>
                    Coordenadas fora dos limites:
                    ${coordenadasForaDoLimite}
                </small>
            `
            : ""
    }
`;


// Inicializa os filtros com todos os registros válidos.
dadosCSVFiltrados = [...dadosCSVImportados];

preencherFiltroGenero();
preencherFiltroEspecie();

filtroGeneroCSV.value = "";
filtroEspecieCSV.value = "";

painelFiltroCSV.hidden = false;

atualizarResumoFiltroCSV();


// =====================================================
// ATUALIZAÇÃO DO MAPA PELO FILTRO
// =====================================================

function desenharDadosCSVFiltrados() {
    camadaDadosUsuario.clearLayers();

    dadosCSVFiltrados.forEach(function (registro) {
        const latitude = Number(
            registro.decimalLatitude
        );

        const longitude = Number(
            registro.decimalLongitude
        );

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            return;
        }

        const nomeEspecie =
            String(registro.species || "Espécie não informada")
                .trim();

        const marcador = L.circleMarker(
            [latitude, longitude],
            {
                radius: 6,
                color: "#224f72",
                weight: 1.5,
                fillColor: "#4f92bd",
                fillOpacity: 0.8
            }
        );

        marcador.bindPopup(`
    <strong>${nomeEspecie}</strong><br>
    Latitude: ${latitude}<br>
    Longitude: ${longitude}<br>
    Altitude: consultando...<br>
    Fonte: dados importados
`);

marcador.on("popupopen", async function () {
    const altitude = await obterAltitude(
        latitude,
        longitude
    );

    marcador.setPopupContent(`
        <strong>${nomeEspecie}</strong><br>
        Latitude: ${latitude}<br>
        Longitude: ${longitude}<br>
        Altitude: ${formatarAltitude(altitude)}<br>
        Fonte: dados importados<br>
        <small>
            Altitude estimada pelo DEM,
            resolução aproximada de 500 m
        </small>
    `);
});

        marcador.addTo(camadaDadosUsuario);
    });
}

function aplicarFiltroCSV() {
    const generoSelecionado =
        filtroGeneroCSV.value;

    const especieSelecionada =
        filtroEspecieCSV.value;

    dadosCSVFiltrados = dadosCSVImportados.filter(
        function (registro) {
            const especie = String(
                registro.species || ""
            ).trim();

            const genero = obterGenero(especie);

            const correspondeGenero =
                generoSelecionado === "" ||
                genero === generoSelecionado;

            const correspondeEspecie =
                especieSelecionada === "" ||
                especie === especieSelecionada;

            return (
                correspondeGenero &&
                correspondeEspecie
            );
        }
    );

    desenharDadosCSVFiltrados();
    atualizarResumoFiltroCSV();
}

filtroGeneroCSV.addEventListener(
    "change",
    function () {
        const generoSelecionado =
            filtroGeneroCSV.value;

        preencherFiltroEspecie(
            generoSelecionado
        );

        filtroEspecieCSV.value = "";

        aplicarFiltroCSV();
    }
);

filtroEspecieCSV.addEventListener(
    "change",
    function () {
        aplicarFiltroCSV();
    }
);

botaoLimparFiltroCSV.addEventListener(
    "click",
    function () {
        filtroGeneroCSV.value = "";

        preencherFiltroEspecie();

        filtroEspecieCSV.value = "";

        dadosCSVFiltrados = [
            ...dadosCSVImportados
        ];

        desenharDadosCSVFiltrados();
        atualizarResumoFiltroCSV();
    }
);






        // Atualiza a ferramenta de extração de altitude.
quantidadeRegistrosAltitude.textContent =
    dadosCSVFiltrados.length;

botaoExtrairAltitude.disabled =
    dadosCSVFiltrados.length === 0;

botaoBaixarAltitude.disabled = true;

resultadoExtracaoAltitude.textContent =
    dadosCSVFiltrados.length > 0
        ? `${dadosCSVFiltrados.length} registros prontos para a extração.`
        : "Nenhum registro válido disponível para a extração.";

        
        if (
            registrosAdicionados > 0 &&
            !mapaEspecies.hasLayer(camadaDadosUsuario)
        ) {
            camadaDadosUsuario.addTo(mapaEspecies);
        }
    };

    leitor.onerror = function () {
        resultadoImportacao.textContent =
            "Não foi possível ler o arquivo.";
    };

    leitor.readAsText(arquivo, "UTF-8");
});

botaoRemoverCSV.addEventListener("click", function () {
    camadaDadosUsuario.clearLayers();
    campoArquivoCSV.value = "";
    dadosCSVImportados = [];
    dadosCSVComAltitude = [];
    cabecalhosCSVImportado = [];
    botaoRemoverCSV.disabled = true;

    resultadoImportacao.textContent =
        "Nenhum arquivo importado.";
});

// FIM DA IMPORTAÇÃO DE CSV


// =====================================================
// EXTRAÇÃO DE ALTITUDE DOS DADOS IMPORTADOS
// =====================================================

botaoExtrairAltitude.addEventListener(
    "click",
    async function () {
        if (dadosCSVFiltrados.length === 0) {
            resultadoExtracaoAltitude.textContent =
                "Importe um arquivo CSV antes de extrair as altitudes.";
            return;
        }

        botaoExtrairAltitude.disabled = true;
        botaoBaixarAltitude.disabled = true;

        dadosCSVComAltitude = [];

        let altitudesObtidas = 0;
        let altitudesNaoDisponiveis = 0;

        resultadoExtracaoAltitude.textContent =
            "Preparando a extração das altitudes...";

        for (
            let indice = 0;
            indice < dadosCSVFiltrados.length;
            indice++
        ) {
            const registro = dadosCSVFiltrados[indice];

            const latitude = Number(
                registro.decimalLatitude
            );

            const longitude = Number(
                registro.decimalLongitude
            );

            let altitude = null;

            try {
                altitude = await obterAltitude(
                    latitude,
                    longitude
                );
            } catch (erro) {
                console.error(
                    "Erro ao extrair altitude:",
                    latitude,
                    longitude,
                    erro
                );
            }

            const altitudeValida =
                Number.isFinite(altitude) &&
                altitude >= 0;

            const registroComAltitude = {
                ...registro,
                elevation: altitudeValida
                    ? Math.round(altitude)
                    : "",
                elevationUnit: altitudeValida
                    ? "m"
                    : "",
                elevationSource: altitudeValida
                    ? "DEM 500 m"
                    : ""
            };

            dadosCSVComAltitude.push(
                registroComAltitude
            );

            if (altitudeValida) {
                altitudesObtidas++;
            } else {
                altitudesNaoDisponiveis++;
            }

            // Atualiza o progresso a cada 25 registros.
            if (
                (indice + 1) % 25 === 0 ||
                indice === dadosCSVFiltrados.length - 1
            ) {
                const percentual = Math.round(
                    ((indice + 1) /
                        dadosCSVFiltrados.length) *
                        100
                );

                resultadoExtracaoAltitude.textContent =
                    `Extraindo altitudes: ` +
                    `${indice + 1} de ` +
                    `${dadosCSVFiltrados.length} ` +
                    `registros (${percentual}%).`;

                // Permite que a página atualize o progresso.
                await new Promise(function (resolver) {
                    setTimeout(resolver, 0);
                });
            }
        }

        botaoExtrairAltitude.disabled = false;

        botaoBaixarAltitude.disabled =
            dadosCSVComAltitude.length === 0;

        resultadoExtracaoAltitude.innerHTML = `
            <strong>Extração concluída.</strong><br>
            ${altitudesObtidas} registros com altitude estimada.<br>
            ${altitudesNaoDisponiveis} registros sem altitude disponível.
        `;
    }
);

// =====================================================
// DOWNLOAD DO CSV COM ALTITUDE
// =====================================================

botaoBaixarAltitude.addEventListener(
    "click",
    function () {
        if (dadosCSVComAltitude.length === 0) {
            resultadoExtracaoAltitude.textContent =
                "Extraia as altitudes antes de baixar o arquivo.";
            return;
        }

        const novosCabecalhos = [
            ...cabecalhosCSVImportado.filter(function (cabecalho) {
                return (
                    cabecalho !== "elevation" &&
                    cabecalho !== "elevationUnit" &&
                    cabecalho !== "elevationSource"
                );
            }),
            "elevation",
            "elevationUnit",
            "elevationSource"
        ];

        // Prepara cada valor para evitar problemas com
        // vírgulas, aspas e quebras de linha.
        function prepararValorCSV(valor) {
            if (
                valor === null ||
                valor === undefined
            ) {
                return "";
            }

            const texto = String(valor)
                .replace(/"/g, '""');

            return `"${texto}"`;
        }

        const linhasCSV = [];

        linhasCSV.push(
            novosCabecalhos
                .map(prepararValorCSV)
                .join(";")
        );

        dadosCSVComAltitude.forEach(function (registro) {
            const linha = novosCabecalhos.map(
                function (cabecalho) {
                    return prepararValorCSV(
                        registro[cabecalho]
                    );
                }
            );

            linhasCSV.push(linha.join(";"));
        });

        // BOM permite que o Excel reconheça corretamente
        // acentos e caracteres especiais.
        const conteudoCSV =
            "\uFEFF" + linhasCSV.join("\r\n");

        const arquivoCSV = new Blob(
            [conteudoCSV],
            {
                type: "text/csv;charset=utf-8;"
            }
        );



        const enderecoArquivo =
            URL.createObjectURL(arquivoCSV);

        const linkDownload =
            document.createElement("a");

        linkDownload.href = enderecoArquivo;
        linkDownload.download =
            "dados_com_altitude.csv";

        document.body.appendChild(linkDownload);
        linkDownload.click();
        linkDownload.remove();

        URL.revokeObjectURL(enderecoArquivo);

        resultadoExtracaoAltitude.innerHTML = `
            <strong>Arquivo criado com sucesso.</strong><br>
            ${dadosCSVComAltitude.length}
            registros foram incluídos no CSV.
        `;
    }
);

// =====================================================
// JANELA DE FEEDBACK
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {
        const botaoAbrirFeedback =
            document.querySelector(
                "#abrir-feedback"
            );

        const janelaFeedback =
            document.querySelector(
                "#janela-feedback"
            );

        if (
            !botaoAbrirFeedback ||
            !janelaFeedback
        ) {
            console.error(
                "A janela de feedback não foi encontrada."
            );

            return;
        }

        const elementosFecharFeedback =
            janelaFeedback.querySelectorAll(
                "[data-fechar-feedback]"
            );

        function abrirJanelaFeedback() {
            janelaFeedback.hidden = false;

            document.body.classList.add(
                "modal-feedback-aberto"
            );

            const botaoFechar =
                janelaFeedback.querySelector(
                    ".fechar-modal-feedback"
                );

            if (botaoFechar) {
                botaoFechar.focus();
            }
        }

        function fecharJanelaFeedback() {
            janelaFeedback.hidden = true;

            document.body.classList.remove(
                "modal-feedback-aberto"
            );

            botaoAbrirFeedback.focus();
        }

        botaoAbrirFeedback.addEventListener(
            "click",
            abrirJanelaFeedback
        );

        elementosFecharFeedback.forEach(
            function (elemento) {
                elemento.addEventListener(
                    "click",
                    fecharJanelaFeedback
                );
            }
        );

        document.addEventListener(
            "keydown",
            function (evento) {
                if (
                    evento.key === "Escape" &&
                    !janelaFeedback.hidden
                ) {
                    fecharJanelaFeedback();
                }
            }
        );
    }
);

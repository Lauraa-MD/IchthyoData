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
}

// INÍCIO DO MAPA
const limitesAmericaDoSul = L.latLngBounds(
    [-57, -90],
    [15, -30]
);

const mapaEspecies = L.map("mapa-especies", {
    maxBounds: limitesAmericaDoSul,
    maxBoundsViscosity: 1.0,
    minZoom: 4
}).setView(
    [-15, -60],
    4
);

const camadaProjeto = L.featureGroup().addTo(mapaEspecies);
const camadaGBIF = L.featureGroup().addTo(mapaEspecies);
const camadaSpeciesLink = L.featureGroup().addTo(mapaEspecies);
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
fetch("grandes_bacias.geojson")
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
            color: "#76539b",
            weight: 1.2,
            fillColor: "#b69ad3",
            fillOpacity: 0.15
        };
    },

    onEachFeature: function (feicao, camada) {
        const propriedades = feicao.properties || {};
        const codigoFeow = propriedades.FEOW_ID;
        const areaKm2 = Number(propriedades.AREA_SKM);

        camada.bindPopup(`
            <strong>Ecorregião de água doce — FEOW</strong>
            <br><strong>Código FEOW:</strong> ${codigoFeow}
            <br><strong>Área aproximada:</strong>
            ${areaKm2.toLocaleString("pt-BR", {
                maximumFractionDigits: 1
            })} km²
            <br>
            <a
                href="https://www.feow.org/ecoregions/details/${codigoFeow}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver informações na FEOW
            </a>
        `);
    }
});

fetch("dados/ecoregions/ecorregioes_neotropicais_simplificadas")
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

fetch("rios_principais_simplificados.geojson")
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

    dadosProprios: {
        color: "#174f78",
        fillColor: "#3b8fc2"
    }
};

// Cria o símbolo que identifica a fonte do registro.
function criarIconeFonte(fonte) {
    const classesPorFonte = {
        gbif: "simbolo-gbif",
        speciesLink: "simbolo-specieslink",
        dadosProprios: "simbolo-dados-proprios"
    };

    return L.divIcon({
        className: "icone-fonte-registro",

        html: `
            <span class="
                simbolo-fonte
                ${classesPorFonte[fonte]}
            "></span>
        `,

        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
}


// Desenha os símbolos sobre os registros.
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
            camada: camadaDadosUsuario,
            fonte: "dadosProprios"
        }
    ];

    conjuntos.forEach(function (conjunto) {
        conjunto.camada
            .getLayers()
            .forEach(function (marcador) {
                if (
                    typeof marcador.getLatLng !==
                    "function"
                ) {
                    return;
                }

                L.marker(
                    marcador.getLatLng(),
                    {
                        icon: criarIconeFonte(
                            conjunto.fonte
                        ),
                        interactive: false,
                        keyboard: false
                    }
                ).addTo(camadaSimbolosFontes);
            });
    });

    camadaSimbolosFontes.addTo(
        mapaEspecies
    );

    camadaSimbolosFontes.bringToFront();
}


// Atualiza as cores conforme a fonte ou a altitude.
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
            camada: camadaDadosUsuario,
            fonte: "dadosProprios"
        }
    ];

    for (const item of camadas) {
        const marcadores =
            item.camada.getLayers();

        for (const marcador of marcadores) {
            if (
                typeof marcador.getLatLng !== "function" ||
                typeof marcador.setStyle !== "function"
            ) {
                continue;
            }

            const estiloFonte =
                estilosPorFonte[item.fonte];

            if (!relevoAtivo) {
                marcador.setStyle({
                    color: estiloFonte.color,
                    fillColor: estiloFonte.fillColor
                });

                continue;
            }

            let altitude =
                marcador.options.altitude;

            if (!Number.isFinite(altitude)) {
                const coordenada =
                    marcador.getLatLng();

                altitude = await obterAltitude(
                    coordenada.lat,
                    coordenada.lng
                );

                marcador.options.altitude =
                    altitude;
            }

            marcador.setStyle({
                color: "#5c4033",
                fillColor:
                    obterCorAltitude(altitude)
            });
        }
    }

    atualizarSimbolosDasFontes();
}



function formatarAltitude(altitude) {
    if (altitude === null || !Number.isFinite(altitude)) {
        return "Não disponível";
    }

    return `${altitude.toLocaleString("pt-BR")} m`;
}


// INÍCIO DA BUSCA GERAL NO GBIF


const resultadosBancos = {
    gbif: null,
    speciesLink: null
};

function atualizarQuadroResultados(nomeCientifico) {
    let conteudo = `
        <strong>Consulta concluída</strong><br>
        Espécie pesquisada:
        <em>${nomeCientifico}</em><br><br>
    `;

    if (resultadosBancos.gbif) {
        conteudo += `
            <strong>GBIF</strong><br>
            ${resultadosBancos.gbif.encontrados}
            registros encontrados<br>
            ${resultadosBancos.gbif.carregados}
            registros carregados no mapa<br>
            ${resultadosBancos.gbif.coordenadas}
            coordenadas únicas<br><br>
        `;
    } else {
        conteudo += `
            <strong>GBIF</strong><br>
            Consultando...<br><br>
        `;
    }

    if (resultadosBancos.speciesLink) {
        conteudo += `
            <strong>speciesLink</strong><br>
            ${resultadosBancos.speciesLink.encontrados}
            registros encontrados<br>
            ${resultadosBancos.speciesLink.carregados}
            registros carregados no mapa<br>
            ${resultadosBancos.speciesLink.coordenadas}
            coordenadas únicas
        `;
    } else {
        conteudo += `
            <strong>speciesLink</strong><br>
            Consultando...
        `;
    }

    resultadoBusca.innerHTML = conteudo;
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

        buscarOcorrenciasGBIF(nomeCientifico);
        buscarOcorrenciasSpeciesLink(nomeCientifico);
    }
);


function buscarOcorrenciasGBIF(nomeCientifico) {
    const nomeCodificado =
        encodeURIComponent(nomeCientifico);

    const urlGBIF =
        `https://api.gbif.org/v1/occurrence/search` +
        `?scientific_name=${nomeCodificado}` +
        `&continent=SOUTH_AMERICA` +
        `&has_coordinate=true` +
        `&has_geospatial_issue=false` +
        `&occurrence_status=PRESENT` +
        `&limit=300`;

    // Remove os pontos da pesquisa anterior
    camadaGBIF.clearLayers();

    fetch(urlGBIF)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error(
                    "Não foi possível acessar o GBIF."
                );
            }

            return resposta.json();
        })
        .then(function (dadosGBIF) {
            if (
                dadosGBIF.count === 0 ||
                dadosGBIF.results.length === 0
            ) {
                resultadoBusca.textContent =
                    `Nenhum registro com coordenadas foi encontrado ` +
                    `para “${nomeCientifico}” na América do Sul.`;

                return;
            }

            const registrosPorCoordenada = new Map();

            dadosGBIF.results.forEach(function (registro) {
                const latitude =
                    registro.decimalLatitude;

                const longitude =
                    registro.decimalLongitude;

                if (
                    typeof latitude !== "number" ||
                    typeof longitude !== "number"
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
    registro.institutioncode ||
    registro.collectioncode ||
    "Instituição/coleção não informada";

const numeroCatalogo =
    registro.catalognumber ||
    "Número não informado";

const numeroIndividuos =
    registro.individualcount ??
    "Não informado";
                                return `
                                    <div class="registro-popup">
                                        <strong>
                                            Registro ${indice + 1}
                                        </strong>

                                        <br><strong>Identificação:</strong>
                                        <em>${nomeRegistro}</em>

                                        <br><strong>Localidade:</strong>
                                        ${localidade}

                                        <br><strong>Instituição/coleção:</strong>
${instituicao}

<br><strong>Catálogo:</strong>
${numeroCatalogo}

<br><strong>Indivíduos:</strong>
${numeroIndividuos}
                                    </div>
                                `;
                            })
                            .join("<hr>");

                    marcadorGBIF.bindPopup(`
                        <strong>Registros do GBIF</strong>

                        <br><em>${nomeCientifico}</em>

                        <br><strong>Registros neste ponto:</strong>
                        ${grupo.registros.length}

                        <hr>

                        ${listaRegistros}
                    `);
                }
            );

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

            if (!mapaEspecies.hasLayer(camadaGBIF)) {
                camadaGBIF.addTo(mapaEspecies);
            }

          const quantidadeExibida =
    dadosGBIF.results.length;

atualizarIndicadores(
    dadosGBIF.count,
    quantidadeExibida,
    registrosPorCoordenada.size
);

    resultadosBancos.gbif = {
    encontrados: dadosGBIF.count,
    carregados: quantidadeExibida,
    coordenadas: registrosPorCoordenada.size
};

atualizarQuadroResultados(nomeCientifico);

        })
        .catch(function (erro) {
            console.error(
                "Erro na consulta ao GBIF:",
                erro
            );

            resultadoBusca.textContent =
                "Não foi possível consultar o GBIF. " +
                "Verifique sua conexão e tente novamente.";
         });

}



// INÍCIO DA BUSCA NO SPECIESLINK

function buscarOcorrenciasSpeciesLink(nomeCientifico) {
    const urlSpeciesLink = new URL(
    "https://ichthyodata-specieslink.lauramdonin.workers.dev/"
);

urlSpeciesLink.searchParams.set(
    "scientificname",
    nomeCientifico
);

camadaSpeciesLink.clearLayers();

    fetch(urlSpeciesLink)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error(
                    `Erro HTTP ${resposta.status}`
                );
            }

            return resposta.json();
        })
        .then(function (dadosSpeciesLink) {
            console.log(
                "Campos recebidos do speciesLink:",
                dadosSpeciesLink.features?.[0]?.properties
            );

            if (
                !dadosSpeciesLink.features ||
                dadosSpeciesLink.features.length === 0
            ) {
                resultadosBancos.speciesLink = {
                    encontrados: Number(
                        dadosSpeciesLink.numberMatched || 0
                    ),
                    carregados: 0,
                    coordenadas: 0
                };

                atualizarIndicadoresSpeciesLink(
                resultadosBancos.speciesLink.encontrados,
                resultadosBancos.speciesLink.carregados,
                resultadosBancos.speciesLink.coordenadas
                );

                atualizarQuadroResultados(nomeCientifico);

                console.log(
                    "Nenhum registro encontrado no speciesLink."
                );

                return;
            }

            const registrosPorCoordenada = new Map();

            dadosSpeciesLink.features.forEach(
                function (feature) {
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
                }
            );
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

                    marcadorSpeciesLink.options.fonteRegistro =
                        "speciesLink";

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
    registro.institutioncode ||
    registro.collectioncode ||
    "Instituição/coleção não informada";

const numeroCatalogo =
    registro.catalognumber ||
    "Número não informado";

const numeroIndividuos =
    registro.individualcount ??
    "Não informado";

                                return `
                                    <div class="registro-popup">
                                        <strong>
                                            Registro ${indice + 1}
                                        </strong>

                                        <br><strong>Identificação:</strong>
                                        <em>${nomeRegistro}</em>

                                        <br><strong>Localidade:</strong>
                                        ${localidade}

                                        <br><strong>Instituição/coleção:</strong>
${instituicao}

<br><strong>Catálogo:</strong>
${numeroCatalogo}

<br><strong>Indivíduos:</strong>
${numeroIndividuos}
                                    </div>
                                `;
                            })
                            .join("<hr>");

                    marcadorSpeciesLink.bindPopup(`
                        <strong>Registros do speciesLink</strong>

                        <br><em>${nomeCientifico}</em>

                        <br><strong>Registros neste ponto:</strong>
                        ${grupo.registros.length}

                        <hr>

                        ${listaRegistros}
                    `);
                }
            );

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


            if (
                !mapaEspecies.hasLayer(
                    camadaSpeciesLink
                )
            ) {
                camadaSpeciesLink.addTo(
                    mapaEspecies
                );
            }

            resultadosBancos.speciesLink = {
    encontrados: Number(
        dadosSpeciesLink.numberMatched ||
        dadosSpeciesLink.features.length
    ),
    carregados: Number(
        dadosSpeciesLink.numberReturned ||
        dadosSpeciesLink.features.length
    ),
    coordenadas: registrosPorCoordenada.size
};

atualizarIndicadoresSpeciesLink(
    resultadosBancos.speciesLink.encontrados,
    resultadosBancos.speciesLink.carregados,
    resultadosBancos.speciesLink.coordenadas
);

atualizarQuadroResultados(nomeCientifico);

console.log(
    "speciesLink:",
    resultadosBancos.speciesLink.encontrados,
    "registros encontrados;",
    resultadosBancos.speciesLink.carregados,
    "carregados."
);
})
.catch(function (erro) {
    resultadosBancos.speciesLink = {
        encontrados: 0,
        carregados: 0,
        coordenadas: 0
    };

    atualizarIndicadoresSpeciesLink(0, 0, 0);

    atualizarQuadroResultados(nomeCientifico);

    console.error(
        "Erro na consulta ao speciesLink:",
        erro
    );
});
}




// FIM DA BUSCA NO SPECIESLINK


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

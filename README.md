# IchthyoData

**Plataforma de integração e exploração de dados de ocorrência de peixes neotropicais**

IchthyoData é uma plataforma científica desenvolvida para integrar, consultar,
visualizar, comparar e exportar dados de ocorrência de peixes neotropicais
provenientes de diferentes fontes.

A plataforma permite explorar espacialmente registros de ocorrência em um
ambiente interativo, comparar informações provenientes de diferentes bases de
dados e incorporar dados próprios fornecidos pelo usuário.

🌐 **Plataforma:** https://lauraa-md.github.io/IchthyoData/

## Principais funcionalidades

- Busca por nome científico.
- Integração de diferentes fontes de dados de ocorrência.
- Visualização interativa dos registros em mapa.
- Identificação da fonte de cada registro.
- Comparação da disponibilidade de registros entre diferentes fontes.
- Importação e visualização de dados próprios.
- Visualização de camadas geográficas de referência.
- Exportação de mapas em PNG e PDF.
- Exportação de dados permitidos em formato CSV.

## Fontes de dados de ocorrência

Atualmente, o IchthyoData integra informações provenientes de:

- **GBIF — Global Biodiversity Information Facility**
- **speciesLink**
- **FishNet2**
- **Plazi TreatmentBank**
- **Dados próprios fornecidos pelo usuário**

Os registros provenientes dessas fontes permanecem sujeitos às licenças,
condições de uso, atribuição e citação estabelecidas por seus respectivos
provedores e instituições de origem.

O IchthyoData não reivindica propriedade sobre os dados obtidos de fontes
externas.

A disponibilidade de uma fonte para consulta e visualização no IchthyoData
não implica necessariamente autorização para redistribuição dos respectivos
dados.

Informações detalhadas sobre proveniência, atribuição e condições de uso estão
disponíveis em [`DATA_SOURCES.md`](DATA_SOURCES.md).

## Camadas geográficas

O mapa do IchthyoData inclui camadas geográficas de referência destinadas a
auxiliar a exploração espacial dos registros, incluindo:

- mapa-base OpenStreetMap/CARTO;
- ecorregiões de água doce — Freshwater Ecoregions of the World (FEOW);
- principais redes hidrográficas derivadas de HydroRIVERS;
- bacias hidrográficas derivadas de HydroBASINS;
- camada de relevo para contextualização geográfica.

As camadas permanecem sujeitas às licenças e requisitos de atribuição
estabelecidos pelos respectivos provedores.

A documentação completa das fontes geográficas está disponível em
[`DATA_SOURCES.md`](DATA_SOURCES.md).

## Qualidade e responsabilidade pelo uso dos dados

O IchthyoData atua como ferramenta de integração, consulta, visualização e
exportação de informações e não realiza validação independente de todos os
registros recuperados das fontes externas.

Os registros podem conter erros ou imprecisões taxonômicas, geográficas,
curatoriais, de identificação, transcrição ou georreferenciamento provenientes
das bases de origem.

A seleção, verificação, filtragem, análise e interpretação dos dados são de
responsabilidade do usuário.

Resultados, mapas, análises, publicações e outros produtos derivados do uso
do IchthyoData são de responsabilidade de seus respectivos autores.

Consulte [`TERMS_OF_USE.md`](TERMS_OF_USE.md) para informações adicionais.

## Reprodutibilidade

As bases consultadas pelo IchthyoData são dinâmicas e podem ser atualizadas
independentemente da plataforma.

Para favorecer a reprodutibilidade, recomenda-se registrar:

- a versão do IchthyoData utilizada;
- a data da consulta;
- o nome científico pesquisado;
- as fontes de dados consultadas;
- os dados exportados e filtros relevantes utilizados na análise.

## Como citar

O uso do IchthyoData em publicações científicas, trabalhos acadêmicos,
relatórios ou outros produtos científicos e técnicos deve ser acompanhado
da citação da plataforma.

A referência oficial da versão utilizada será disponibilizada no arquivo
[`CITATION.cff`](CITATION.cff).

A citação definitiva da versão **1.0.0**, incluindo seu DOI, será adicionada
após o depósito da primeira versão estável.

## Licença

Copyright © 2026 **Laura Modesti Donin**. Todos os direitos reservados.

O IchthyoData é disponibilizado para uso científico, educacional e outros
usos não comerciais, conforme as condições estabelecidas no arquivo
[`LICENSE`](LICENSE).

O código-fonte não pode ser modificado, redistribuído, incorporado a outros
produtos ou utilizado comercialmente sem autorização prévia da autora.

As condições aplicáveis ao software não substituem as licenças e termos de
uso das fontes externas integradas à plataforma.

## Autoria

**Laura Modesti Donin**  
Laboratório de Estudos Subterrâneos (LES)  
Universidade Federal de São Carlos (UFSCar)  
São Carlos, SP, Brasil

ORCID: https://orcid.org/0000-0002-9609-6400

## Versão

**IchthyoData v1.0.0 — preparação para primeira versão estável (2026)**

O conteúdo e as funcionalidades da plataforma poderão ser atualizados em
versões futuras.
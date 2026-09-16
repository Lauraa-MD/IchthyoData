# IchthyoData — Data Sources and Attribution

**Last updated: September 2026**

IchthyoData integrates information obtained from independent external
databases, APIs, services, and geographic data providers.

IchthyoData does not claim ownership of data obtained from these external
sources. Original records and associated information remain subject to the
licenses, terms of use, attribution requirements, and citation requirements
established by their respective providers, publishers, institutions, and
copyright holders.

The identification of a source within IchthyoData indicates the service
through which the information was retrieved and does not imply ownership
of the underlying data by IchthyoData.

Users are responsible for consulting and complying with the terms and
citation requirements applicable to the original data used in their
research or other products.

## 1. GBIF — Global Biodiversity Information Facility

IchthyoData accesses species occurrence information made available through
the GBIF infrastructure using the GBIF API.

GBIF provides the infrastructure through which biodiversity data published
by numerous institutions and data publishers can be accessed. GBIF is not
necessarily the owner or custodian of the occurrence data made available
through its network.

Records accessed through GBIF remain subject to the license selected by
their respective data publishers. GBIF occurrence datasets may be associated
with licenses including CC0, CC BY, and CC BY-NC.

IchthyoData does not claim ownership of GBIF-mediated data.

Users intending to use GBIF-mediated records in scientific publications,
datasets, reports, or other products are responsible for identifying and
appropriately acknowledging the original data publishers and complying with
the license associated with each dataset.

Because IchthyoData retrieves occurrence information through the GBIF
Occurrence Search API, searches performed through the platform do not
automatically receive a GBIF occurrence-download DOI. Users requiring a
persistent citation for a set of GBIF-mediated records should follow the
current GBIF citation guidelines, including the recommendations for data
accessed through search API-based tools and, when appropriate, the creation
of a derived dataset.

The provenance information associated with GBIF records should be retained
when records are exported or subsequently reused.

Official resources:

- GBIF Data User Agreement: https://www.gbif.org/terms/data-user
- GBIF Citation Guidelines: https://www.gbif.org/citation-guidelines
- GBIF Terms of Use: https://www.gbif.org/terms

## 2. FishNet2

IchthyoData provides search and visualization functionality for fish
specimen information accessed through FishNet2.

FishNet2 is a collaborative network of fish collections that provides
access to specimen data contributed by natural history museums,
universities, and other participating institutions.

FishNet2 does not assert intellectual property rights over the data made
available through its network. The underlying records remain associated
with their original institutional data providers and may also be subject
to provider-specific data-use policies.

According to the FishNet2 Data-Use Statement, data obtained through
FishNet2 are intended for non-profit educational use and personal
research use by students and scholars. FishNet2 further states that its
data may not be repackaged, resold, or redistributed without the express
written consent of the appropriate curatorial authorities of the
institutions holding the data.

For this reason, IchthyoData uses FishNet2 records for consultation and
visualization but does not provide FishNet2-mediated records through the
IchthyoData CSV data-export functionality.

Users wishing to download or reuse FishNet2-mediated specimen records
should obtain the data through FishNet2 and comply with the FishNet2
Data-Use Agreement as well as any policies established by the original
institutional data providers.

FishNet2 requests that users acknowledge both the provenance of the
original data providers and FishNet2 in presentations and publications.
Users should consult the current FishNet2 Data-Use Statement for the
recommended citation format and requirements.

Official resources:

- FishNet2 Data Sharing and Use Policies: https://www.fishnet2.net/datapolicy
- FishNet2: https://www.fishnet2.net/

## 3. speciesLink

IchthyoData provides search and visualization functionality for biological
collection records accessed through the speciesLink network.

speciesLink is a distributed information system developed and maintained
by the Centro de Referência em Informação Ambiental (CRIA) that integrates
primary biodiversity data made available by participating biological
collections.

The records accessible through speciesLink originate from independent
collections and institutions. IchthyoData does not claim ownership of
speciesLink-mediated records or of the underlying collection data.

Users should recognize that speciesLink acts as an infrastructure for
accessing distributed collection information and that the original
institutions and collections remain important components of data
provenance.

IchthyoData uses speciesLink-mediated records for consultation and
visualization. Because a general redistribution license applicable to all
records retrieved through speciesLink has not been assumed by IchthyoData,
speciesLink-mediated records are not redistributed through the IchthyoData
CSV data-export functionality.

Users wishing to download, reuse, or redistribute records obtained through
speciesLink should consult the original speciesLink service and any
applicable requirements established by CRIA and the corresponding data
providers.

Users are responsible for appropriately acknowledging speciesLink and the
original collections or institutions whose records are used in scientific
or technical products.

Official resource:

- speciesLink: https://splink.cria.org.br/

## 4. Plazi TreatmentBank

IchthyoData provides access to occurrence information extracted from
taxonomic literature and made available through the Plazi TreatmentBank.

TreatmentBank is a service provided by Plazi that extracts, structures,
enhances, links, and disseminates taxonomic information from scholarly
publications. This information includes taxonomic treatments, material
citations, bibliographic references, figures, and other structured data.

IchthyoData primarily uses material-citation information associated with
taxonomic treatments to identify occurrence records reported in the
scientific literature.

Plazi makes TreatmentBank data openly accessible through its services and
APIs and provides structured data in formats including Darwin Core Archives.
TreatmentBank resources identify structured treatment data as openly
accessible, with relevant data made available under public-domain terms.

IchthyoData does not claim authorship or ownership of the original
publications from which Plazi extracts and structures information.

When Plazi-mediated records are used in scientific or technical products,
users should preserve their provenance and consult the associated treatment
and original publication whenever appropriate. Bibliographic information
provided by Plazi should be used to identify and cite the original
taxonomic publication when the scientific context requires it.

Plazi-mediated occurrence records may be included in the IchthyoData CSV
export while retaining available provenance information.

Official resources:

- Plazi TreatmentBank: https://plazi.org/treatmentbank/
- Treatment Data Access: https://plazi.org/treatmentbank/treatment-data-access/
- TreatmentBank API: https://plazi.org/data-apis-tools/treatmentbank-api/

## 5. Geographic and cartographic data

IchthyoData includes geographic reference layers to support the spatial
exploration of occurrence data. These layers are provided for visualization
and geographic context and remain subject to the licenses, terms of use,
and attribution requirements established by their original providers.

### 5.1 OpenStreetMap and CARTO basemap

The interactive basemap displayed by IchthyoData uses CARTO basemap
services and map data from OpenStreetMap contributors.

OpenStreetMap data are licensed under the Open Data Commons Open Database
License (ODbL). CARTO basemap services are subject to CARTO's applicable
terms and attribution requirements.

IchthyoData does not claim ownership of the basemap or the underlying
OpenStreetMap data.

Required attribution to OpenStreetMap and CARTO is maintained in the
interactive map and should also be retained in exported maps when
applicable.

Official resources:

- OpenStreetMap Copyright and License:
  https://www.openstreetmap.org/copyright
- CARTO Basemaps:
  https://carto.com/basemaps/
- CARTO Basemap Terms:
  https://carto.com/legal/basemap-terms/

### 5.2 Freshwater Ecoregions of the World (FEOW)

IchthyoData uses Freshwater Ecoregions of the World (FEOW) as a geographic
reference layer for freshwater biogeographic context.

FEOW was developed by the World Wildlife Fund (WWF) and The Nature
Conservancy (TNC), in collaboration with freshwater scientists.

FEOW materials are subject to the copyright and conditions established by
WWF and The Nature Conservancy. Their terms permit specified
non-commercial, educational, and scientific conservation uses provided
that the applicable copyright notice, citation, and other conditions are
respected.

IchthyoData does not claim ownership of FEOW boundaries or associated data.
The FEOW layer is provided as a reference layer and remains subject to the
terms established by its original providers.

Recommended scientific reference:

Abell, R. et al. (2008). Freshwater ecoregions of the world: a new map of
biogeographic units for freshwater biodiversity conservation.
BioScience 58:403–414.

Official resources:

- FEOW: https://www.feow.org/
- FEOW Copyright: https://www.feow.org/copyright
- FEOW Downloads: https://www.feow.org/download

### 5.3 HydroRIVERS

IchthyoData uses river-network information derived from HydroRIVERS,
a HydroSHEDS data product, as a geographic reference layer.

HydroRIVERS is made available for scientific, educational, and commercial
use under the applicable HydroSHEDS license agreement. Use of the data
remains subject to the attribution, redistribution, and other requirements
established by HydroSHEDS.

IchthyoData does not claim ownership of HydroRIVERS data.

Recommended scientific reference:

Lehner, B. & Grill, G. (2013). Global river hydrography and network routing:
baseline data and new approaches to study the world's large river systems.
Hydrological Processes 27:2171–2186.

Official resources:

- HydroRIVERS:
  https://www.hydrosheds.org/products/hydrorivers
- HydroSHEDS Terms of Use:
  https://www.hydrosheds.org/terms-of-use

### 5.4 HydroBASINS

Hydrographic basin information used by IchthyoData is derived from
HydroBASINS, a HydroSHEDS data product.

HydroBASINS is made available for scientific, educational, and commercial
use under the applicable HydroSHEDS license agreement. IchthyoData uses
these data as a geographic reference layer and does not claim ownership of
the original HydroBASINS data.

Recommended scientific reference:

Lehner, B. & Grill, G. (2013). Global river hydrography and network routing:
baseline data and new approaches to study the world's large river systems.
Hydrological Processes 27:2171–2186.

Official resources:

- HydroBASINS:
  https://www.hydrosheds.org/products/hydrobasins
- HydroSHEDS Terms of Use:
  https://www.hydrosheds.org/terms-of-use

### 5.5 Elevation and relief data

IchthyoData includes an elevation-derived relief layer for geographic
visualization.

The original elevation dataset, processing procedures, derived products,
applicable license, and required attribution should be documented according
to the source dataset used to generate the relief layer.

IchthyoData does not claim ownership of the original elevation data.
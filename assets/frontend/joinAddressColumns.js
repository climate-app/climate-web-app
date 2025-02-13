function joinAddressColumns(item) {
    let columns = [
        "ADDRESS_SITE_NAME",
        "BUILDING_NAME",
        "FLAT_TYPE",
        "FLAT_NUMBER",
        "LEVEL_TYPE",
        "LEVEL_NUMBER",
        "NUMBER_FIRST",
        "NUMBER_LAST",
        //"LOT_NUMBER",
        "STREET_NAME",
        "STREET_TYPE",
        "STREET_SUFFIX",
        "LOCALITY_NAME",
        "STATE",
        "POSTCODE"
    ]
    return columns
        .map(e => item[e])
        .join(' ')
}

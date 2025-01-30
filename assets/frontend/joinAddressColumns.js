function joinAddressColumns(item) {
    return ['NUMBER_FIRST', 'STREET_NAME', 'LOCALITY_NAME', 'POSTCODE']
        .map(e => item[e])
        .join(' ')
}

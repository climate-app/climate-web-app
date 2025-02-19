function addEmissionToggleToButtons() {
    
    let emissionBtns = [...document.getElementById('emission-selector').getElementsByTagName('input')]

    emissionBtns.forEach(radioButton => {
        radioButton.addEventListener('change', () => {

            // Handle the selected option here
            const selectedOption = document.getElementById('emission-selector').querySelector('input:checked').id;

            // Perform actions based on the selected option
            if (selectedOption === 'btn-rcp45') {
                $('.rcp85').fadeToggle(400, 'swing').promise().done(function () {
                    $('.rcp45').fadeToggle(400, 'swing')
                })

            }

            if (selectedOption === 'btn-rcp85') {
                // $('.rcp45').fadeToggle(400, 'swing', function(){ $('.rcp85').fadeToggle(400, 'swing')})
                $('.rcp45').fadeToggle(400, 'swing').promise().done(function () {
                    $('.rcp85').fadeToggle(400, 'swing')
                })
            }
        });
    });
}
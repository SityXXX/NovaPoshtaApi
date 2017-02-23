/**
 * Created by yurabazaliy on 23.02.17.
 */

;(function($) {

    const apiKey = 'f991abc77c429c2821b449dfc2877460';

    $(document).ready(function() {
        $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            data: JSON.stringify({
                'modelName': 'Address',
                'calledMethod': 'getCities',
                'apiKey': apiKey
            })
        }).done(function(data) {
            $.each(data['data'], function(i, element){
                $('#cities').append("<option value='"+ element['Description'] +"'>" + element['Description'] + "</option>");
            });
            $('#cities').change();
        }).fail(function() {
            alert( "error" );
        });
    });

    $('#cities').on('change', function() {
        var city = $(this).val();
        $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            data: JSON.stringify({
                'modelName': 'AddressGeneral',
                'calledMethod': 'getWarehouses',
                "methodProperties": {
                    "CityName": city
                },
                'apiKey': apiKey
            })
        }).done(function(data) {
            $('#warehouses').children().remove();
            $.each(data['data'], function(i, element) {
                $('#warehouses').append("<option value='"+ element['Description'] +"'>" + element['Description'] + "</option>");
            });
        }).fail(function() {
            alert( "error" );
        });
    });

})(jQuery);
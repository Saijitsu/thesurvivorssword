$(document).ready(function () {
    for (i = 0; i < 1; i++) {
        var valueToTransform = players[i].weapon.name;
        var regex = / /gi;
        var weaponIcon = (valueToTransform.replace(regex, "_"));
        $("#player" + i + "ImgWeapon").append("<div class=\"" + weaponIcon + "\"></div>")
    }
});
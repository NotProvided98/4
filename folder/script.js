document.getElementById("file-input").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                document.getElementById("uploaded-image").src = e.target.result;
                
                EXIF.getData(image, function () {
                    // Populate fields with the EXIF data if available
                    document.getElementById("application_record_version").value = EXIF.getTag(this, 'Software') || "No software";
                    document.getElementById("date_created").value = EXIF.getTag(this, 'DateTimeOriginal') || "YYYY:MM:DD HH:MM:SS";
                    document.getElementById("maker").value = EXIF.getTag(this, 'Make') || "No maker";
                    document.getElementById("model").value = EXIF.getTag(this, 'Model') || "No model";
                    document.getElementById("light_source").value = EXIF.getTag(this, 'LightSource') || 0;  // Corrected key without extra space
                });
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("download-button").addEventListener("click", function () {
    const image = document.getElementById("uploaded-image");

    // Get modified EXIF data from input fields
    const newSoftware = document.getElementById("application_record_version").value;
    const newDate = document.getElementById("date_created").value;
    const newMake = document.getElementById("maker").value;
    const newModel = document.getElementById("model").value;
    const newLightSource = parseInt(document.getElementById("light_source").value);
    console.log(newSoftware, newDate, newLightSource, newMake, newModel);

    let exifObj = piexif.load(image.src);
    console.log(exifObj);

    exifObj['0th'][piexif.ImageIFD.Software] = newSoftware;
    exifObj['Exif'][piexif.ExifIFD.DateTimeOriginal] = newDate;
    exifObj['0th'][piexif.ImageIFD.Make] = newMake;
    exifObj['0th'][piexif.ImageIFD.Model] = newModel;
    exifObj['Exif'][piexif.ExifIFD.LightSource] = newLightSource;

    // Convert the modified EXIF object back to a binary string
    const exifBytes = piexif.dump(exifObj);

    // Embed the modified EXIF data into the image
    const newImageData = piexif.insert(exifBytes, image.src);

    const link = document.createElement("a");
    link.href = newImageData;
    link.download = "modified_image.jpg";
    link.click();
});

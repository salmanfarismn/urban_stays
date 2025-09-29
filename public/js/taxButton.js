const taxSwitch = document.querySelector("#switchCheckChecked");
const priceTags = document.querySelectorAll(".ct-price");
const GST_RATE = 0.18; // 18% GST

const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

taxSwitch.addEventListener("click", () => {
    const isChecked = taxSwitch.checked;
    for(let priceTag of priceTags) {
        let originalPrice = parseFloat(priceTag.dataset.bsPrice);
        let finalPrice;

        if(isChecked) {
            finalPrice = originalPrice * (1 + GST_RATE);
        } else {
            finalPrice = originalPrice;
        }

        priceTag.innerText = priceFormatter.format(finalPrice);
    }

    const label = document.querySelector(".form-check-label");
    if(isChecked) {
        label.innerText = "Display total including taxes";
    } else {
        label.innerText = "Display total before taxes";
    }
});

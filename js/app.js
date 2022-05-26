const searchPhone = () => {
    const noResult = document.getElementsByClassName('no-result');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';
    noResult.textContent = '';
    if (searchText == '') {

    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
}



const displaySearchResult = (phones) => {
    // const noResult = document.getElementsByClassName('no-result')
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = "";
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length === 0) {
        const noResult = document.getElementsByClassName('no-result');
        noResult.innerText = 'hshsjfsjfjf';
        console.log('no shitt');
    }
    else {

        phones.forEach(phone => {
            // console.log(phone.slug);
            // const phoneId = phone.slug;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="card p-3">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-2">
                <div class="card-body">
                    <h5 class="card-title text-center">${phone.phone_name}</h5>
                    <button class= "btn-color d-block btn btn-outline-secondary px-4 mx-auto" onclick="loadPhoneDetail('${phone.slug}')">Details</button>
                </div>
             </div>`;
            searchResult.appendChild(div);
        })
    }

}

const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}


const displayPhoneDetail = (phone) => {
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = "";
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top mx-auto w-50 p-4" alt="...">
    <div class="card-body p-4">
    <h5 class="card-title text-center fs-3">${phone.name}</h5>
    <p class="fw-bold fs-5"><span class="">Release: </span> <span class=" fs-5 ms-2">${(phone.releaseDate.length === 0) ? "No release date Found" : phone.releaseDate}</span></p>
    <p class="fw-bold fs-5fw-bold fs-5 card-text">Storage: ${phone.mainFeatures.storage}</p>
    <p class="fw-bold fs-5 card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
    <p class="fw-bold fs-5 card-text">Display: ${phone.mainFeatures.displaySize}</p>
    <p class="fw-bold fs-5 card-text">Memory: ${phone.mainFeatures.memory}</p>

    </div>
    `;
    phoneDetail.appendChild(div);

}
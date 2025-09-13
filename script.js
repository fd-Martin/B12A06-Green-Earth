let categoriesList = document.getElementById("categoriesList");
let plantList = document.getElementById("plantCard");
let cartlist = document.getElementById("cartcontainer");
let spinner = document.getElementById("spinner");
let modalcontainer = document.getElementById("modalcontainer");
let cartitems = [];

const loadAllPlant = () => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      showAllPlants(data.plants);
      hideSpinner();
    })
    .catch((err) => {
      console.error(err);
      hideSpinner();
    });
};

let showAllPlants = (plants) => {
  plantList.innerHTML = ``;
  plants.forEach((plant) => {
    plantList.innerHTML += `
    <div>
    <div class="bg-white shadow-md rounded-lg flex justify-between  flex-col ">

    <img class="w-full h-60 object-cover bg-white rounded-t-lg p-4 pb-0" src="${
      plant.image
    }" />

    <div class="card-body flex flex-col flex-grow">
    <h2 id="${plant.id}" onClick="" class="text-sm font-semibold">${
      plant.name
    }</h2>
    <p class="text-xs text-gray-500 flex-grow">${plant.description.slice(
      0,
      80
    )}...</p>
    
    <div class="mt-2 flex flex-row items-center justify-between">
      <div class="p-2 badge badge-success badge-outline bg-green-100 text-green-700">${
        plant.category
      }</div>
      <div class=" text-black">
      <span>$</span>
      <span>${plant.price}</span>
      </div>
    </div>
    
    <!-- Button stays at bottom -->
    <div class="card-actions mt-4">
      <button id="${
        plant.id
      }" class="btn bg-[#15803d] hover:bg-[#16a54a] text-white w-full rounded-full transition">
        Add to Cart
      </button>
    </div>
  </div>
</div>

    <div/>

    
      `;
  });
};

const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then((data) => {
      showCategories(data.categories);
    })
    .catch((err) => {
      console.error(err);
    });
};

let showCategories = (categories) => {
  categories.forEach((category) => {
    categoriesList.innerHTML += `
    <li id="${category.id}" class="inter text-[16px] text-[#1f2937] font-normal p-3 hover:bg-[#15803d] hover:text-white transition rounded-md ">${category.category_name}</li>
    `;
  });

  categoriesList.addEventListener("click", (e) => {
    let allList = categoriesList.querySelectorAll("li");
    allList.forEach((li) => {
      li.classList.remove("bg-[#15803d]");
      li.classList.remove("text-white");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803d]");
      e.target.classList.add("text-white");
      plantByCategory(e.target.id);
    }
  });
};

let plantByCategory = (id) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showPlantCard(data.plants);
      hideSpinner();
    })
    .catch((err) => {
      console.error(err);
      hideSpinner();
    });
};

let showPlantCard = (plants) => {
  plantList.innerHTML = ``;
  plants.forEach((plant) => {
    plantList.innerHTML += `
    <div>
    <div class="bg-white shadow-md rounded-lg flex justify-between  flex-col">

    <img class="w-full h-60 object-cover bg-white rounded-t-lg p-4 pb-0" src="${
      plant.image
    }" />

    <div class="card-body flex flex-col flex-grow">
    <h2 id="${plant.id}" onClick="" class="text-sm font-semibold">${
      plant.name
    }</h2>
    <p class="text-xs text-gray-500 flex-grow">${plant.description.slice(
      0,
      80
    )}...</p>
    
    <div class="mt-2 flex flex-row items-center justify-between">
      <div class="p-2 badge badge-success badge-outline bg-green-100 text-green-700">${
        plant.category
      }</div>
      <div class=" text-black">
      <span>$</span>
      <span>${plant.price}</span>
      </div>
    </div>
    
    <!-- Button stays at bottom -->
    <div class="card-actions mt-4">
      <button id="${
        plant.id
      }" class="btn bg-[#15803d] hover:bg-[#16a54a] text-white w-full rounded-full transition">
        Add to Cart
      </button>
    </div>
  </div>
</div>

    <div/>

    
      `;
  });
};

plantList.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleCarts(e);
  }

  if (e.target.localName === "h2") {
    console.log(e.target.id);
    handleDetails(e.target.id);
  }
});

let handleCarts = (e) => {
  let id = e.target.id;
  let planttitle = e.target.parentNode.parentNode.children[0].innerText;
  let plantPrice =
    e.target.parentNode.parentNode.children[2].children[1].children[1]
      .innerText;
  let existing = cartitems.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cartitems.push({ id, title: planttitle, price: plantPrice, quantity: 1 });
  }

  showCarts();
};

let showCarts = () => {
  cartlist.innerHTML = ``;

  cartitems.forEach((cart) => {
    cartlist.innerHTML += `
      <li class="p-2 flex justify-between items-center bg-grey-200 bg-base-200 mb-2">
        <div class="flex flex-col text-left gap-1">
          <span class="text-gray-600 font-bold text-sm">${cart.title}</span>  
          <span class="text-gray-600 font-normal text-base">($${cart.price} × ${cart.quantity})</span>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="removeItem('${cart.id}')" 
            class="px-2  text-[#1F2937] rounded"> <i class="fa-solid fa-xmark"></i> </button>
        </div>
      </li>
    `;
  });

  let grandTotal = cartitems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  if (cartitems.length > 0) {
    cartlist.innerHTML += `
      <li class="p-2 font-bold flex justify-between">
        <span>Total:</span> 
        <span>$${grandTotal}</span>
      </li>
    `;
  } else {
    cartlist.innerHTML = ``;
  }
};

let handleDetails = (id) => {
  let modal = document.getElementById("modal");

  modal.innerHTML = `
    <div class="modal-box flex justify-center items-center">
      <div class="w-12 h-12 border-4 loading loading-bars loading-xl"></div>

    </div>
  `;
  modal.showModal();

  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data.plants);
    })
    .catch((err) => {
      console.error(err);
      modal.innerHTML = `
        <div class="modal-box">
          <p class="text-red-500">Failed to load details. Please try again.</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      `;
    });
};

let showDetails = (plant) => {
  let modal = document.getElementById("modal");
  modal.innerHTML = `
    <div class="modal-box">
      <h3 class="text-lg font-bold">${plant.name}</h3>
      <img src="${plant.image}" class="w-full h-80 object-cover rounded-lg my-3"/>
      <p class="py-2 text-sm text-gray-600">${plant.description}</p>

      <div class="mt-2 flex flex-row items-center justify-between">
        <div class="badge badge-success badge-outline bg-green-100 text-green-700">${plant.category}</div>
        <div class=" text-black">
          <span>$</span>
          <span class="font-bold">${plant.price}</span>
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  `;
};

let removeItem = (id) => {
  cartitems = cartitems.filter((cart) => cart.id !== id);
  showCarts();
};

let showSpinner = () => {
  spinner.classList.remove("hidden");
  plantList.classList.add("hidden");
};

let hideSpinner = () => {
  spinner.classList.add("hidden");
  plantList.classList.remove("hidden");
};

loadAllPlant();
loadCategory();

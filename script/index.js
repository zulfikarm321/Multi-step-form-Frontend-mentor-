const steps = document.querySelectorAll('.main_content');
const btnNext = document.querySelectorAll('.btn_next');
const btnPrev = document.querySelectorAll('.btn_prev');
const plans = document.querySelectorAll('.plan_box');
const addOns = document.querySelectorAll('.add_ons_box');
const finishing = document.querySelector('.finishing_wrapper');
const switchCheckbox = document.querySelector('.switch_checkbox');
const stepCircles = document.querySelectorAll('.step_circle');

let state = 0;

let dataCost = {
  monthly: {
    plan: {
      Arcade: '$9/mo',
      Advanced: '$12/mo',
      Pro: '$15/mo'
    },
    addOns: {
      online: {
        price: '$1/mo',
        text: 'Online service'
      },
      larger: {
        price: '$2/mo',
        text: 'Larger storage'
      },
      custom: {
        price: '$2/mo',
        text: 'Customizable Profile'
      }
    }
  },
  yearly: {
    plan: {
      Arcade: '$90/yr',
      Advanced: '$120/yr',
      Pro: '$150/yr'
    },
    addOns: {
      online: {
        price: '$10/yr',
        text: 'Online service'
      },
      larger: {
        price: '$20/yr',
        text: 'Larger storage'
      },
      custom: {
        price: '$20/yr',
        text: 'Customizable Profile'
      }
    }
  }
};

let pickedData = {
  selectedPlan: 'Arcade',
  selectedTimes: 'monthly',
  selectedAddOns: []
};

// RENDER DATA PRICE
const renderDataPrice = () => {
  // PLAN PRICE
  plans.forEach((plan) => {
    const planId = plan.id;
    const planPrice = plan.querySelector('.plan_price');
    if (pickedData.selectedTimes == 'yearly') {
      plan.querySelector('.plan_free_text').style.display = 'block';
    } else {
      plan.querySelector('.plan_free_text').style.display = 'none';
    }
    planPrice.innerHTML = dataCost[pickedData.selectedTimes].plan[planId];
  });

  // ADD ONS PRICE
  addOns.forEach((addOn) => {
    const addOnId = addOn.id;
    const addOnPrice = addOn.querySelector('.add_ons_price');
    addOnPrice.innerHTML =
      dataCost[pickedData.selectedTimes].addOns[addOnId].price;
  });

  document.querySelector('.finishing_selected_plan_text').innerHTML =
    pickedData.selectedPlan;
  document.querySelector('.finishing_selected_plan_price').innerHTML =
    dataCost[pickedData.selectedTimes].plan[pickedData.selectedPlan];
};

const totalPrice = () => {
  const numberPattern = /\d+/g;
  const finalPlanPrice = dataCost[pickedData.selectedTimes].plan[
    pickedData.selectedPlan
  ]
    .match(numberPattern)
    .join('');
  let addOnsPrice = 0;
  pickedData.selectedAddOns.forEach((addOn) => {
    let value =
      dataCost[pickedData.selectedTimes].addOns[addOn].price.match(
        numberPattern
      );
    addOnsPrice += parseInt(value);
  });
  // let finalPrice = parseInt(finalPlanPrice) + parseInt(addOnsPrice);
  console.log(finalPlanPrice);
  const totalText = document.querySelector('.finishing_total_detail');
  const totalPrice = document.querySelector('.finishing_total_price');

  totalText.innerHTML = `
  Total(per ${pickedData.selectedTimes == 'monthly' ? 'month' : 'year'})`;

  totalPrice.innerHTML = `+$${parseInt(finalPlanPrice) + addOnsPrice}/${
    pickedData.selectedTimes == 'monthly' ? 'mo' : 'yr'
  }`;
};

const renderFinishPrice = () => {
  // FINISING PRICE
  const finishingAddOnsWrapper = document.querySelector(
    '.finishing_add_ons_wrapper'
  );

  const div = document.createElement('div');
  for (let i = 0; i < pickedData.selectedAddOns.length; i++) {
    const pickedTimes = pickedData.selectedTimes;
    const addOnsName = pickedData.selectedAddOns[i];
    const addOnsElement = document.createElement('div');
    addOnsElement.className = 'finishing_selected_add_ons';
    addOnsElement.id = addOnsName;
    addOnsElement.innerHTML = `
      <p class="text_gray">${dataCost[pickedTimes].addOns[addOnsName].text}</p>
      <p class="text_blue finishing_selected_add_ons_price">${dataCost[pickedTimes].addOns[addOnsName].price}</p>
    `;
    div.append(addOnsElement);
  }
  finishingAddOnsWrapper.innerHTML = div.innerHTML;
};

// SHOW & HIDE CONTENT
const showContent = (state) => {
  steps[state].style.display = 'flex';
  stepCircles[state].classList.add('step_circle_active');
  totalPrice();
  renderDataPrice();
  renderFinishPrice();
};

const hideContent = (state) => {
  steps[state].style.display = 'none';
  stepCircles[state].classList.remove('step_circle_active');
};

// FORM VALIDATION
const formValidation = () => {
  const formInput = document.querySelectorAll('.form_input');
  let valid = true;
  formInput.forEach((input) => {
    if (!input.value) {
      input.previousElementSibling.querySelector('.error_text').style.display =
        'block';
      valid = false;
    } else {
      input.previousElementSibling.querySelector('.error_text').style.display =
        'none';
      valid = true;
    }
  });
  return valid;
};

// SWITCHBOX SELCT TIMES
switchCheckbox.onclick = () => {
  if (switchCheckbox.checked == true) {
    pickedData.selectedTimes = 'yearly';
    totalPrice();
    document.querySelector('.switch_yearly').classList.add('switch_active');
    document.querySelector('.switch_monthly').classList.remove('switch_active');
  } else {
    pickedData.selectedTimes = 'monthly';
    totalPrice();
    document.querySelector('.switch_yearly').classList.remove('switch_active');
    document.querySelector('.switch_monthly').classList.add('switch_active');
  }
  renderDataPrice();
};

// PICK ADDONS
addOns.forEach((addOnsBox) => {
  addOnsBox.onclick = () => {
    const checkBox = addOnsBox.querySelector('.add_ons_checkbox');
    if (checkBox.checked == false) {
      addOnsBox.classList.add('add_ons_box_active');
      checkBox.checked = true;
      pickedData.selectedAddOns.push(addOnsBox.id);
      renderFinishPrice();
    } else {
      addOnsBox.classList.remove('add_ons_box_active');
      checkBox.checked = false;
      const value = pickedData.selectedAddOns.indexOf(addOnsBox.id);
      if (value > -1) {
        pickedData.selectedAddOns.splice(value, 1);
      }
      renderFinishPrice();
    }
  };
});

// SELECT PLAN
plans.forEach((plan) => {
  plan.onclick = () => {
    for (let i = 0; i < plans.length; i++) {
      plans[i].classList.remove('plan_box_selected');
    }
    plan.classList.add('plan_box_selected');
    pickedData.selectedPlan = plan.id;
    totalPrice();
    renderDataPrice();
  };
});

// STATE HANDLER
btnNext.forEach((btn) => {
  btn.onclick = () => {
    if (formValidation()) {
      hideContent(state);
      state++;
      showContent(state);
    }
  };
});

btnPrev.forEach((btn) => {
  btn.onclick = () => {
    hideContent(state);
    state--;
    showContent(state);
  };
});

const btnConfirm = document.querySelector('.btn_confirm');
btnConfirm.onclick = () => {
  hideContent(state);
  state++;
  showContent(state);
};

showContent(state);

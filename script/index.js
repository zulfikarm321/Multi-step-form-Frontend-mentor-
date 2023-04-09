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
      online: '$1/mo',
      larger: '$2/mo',
      custom: '$2/mo'
    }
  },
  yearly: {
    plan: {
      Arcade: '$90/yr',
      Advanced: '$120/yr',
      Pro: '$150/yr'
    },
    addOns: {
      online: '$10/yr',
      larger: '$20/yr',
      custom: '$20/yr'
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
    addOnPrice.innerHTML = dataCost[pickedData.selectedTimes].addOns[addOnId];
  });

  // FINISING PRICE
  finishing.querySelector('.finishing_selected_plan_price').innerHTML =
    dataCost[pickedData.selectedTimes].plan[pickedData.selectedPlan];
  finishing.querySelector(
    '.finishing_selected_plan_text'
  ).innerHTML = `${pickedData.selectedPlan} (${pickedData.selectedTimes})`;
};

// SHOW & HIDE CONTENT
const showContent = (state) => {
  steps[state].style.display = 'flex';
  stepCircles[state].classList.add('step_circle_active');
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
    document.querySelector('.switch_yearly').classList.add('switch_active');
    document.querySelector('.switch_monthly').classList.remove('switch_active');
  } else {
    pickedData.selectedTimes = 'monthly';
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
    } else {
      addOnsBox.classList.remove('add_ons_box_active');
      checkBox.checked = false;
      const value = pickedData.selectedAddOns.indexOf(addOnsBox.id);
      if (value > -1) {
        pickedData.selectedAddOns.splice(value, 1);
      }
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

showContent(state);

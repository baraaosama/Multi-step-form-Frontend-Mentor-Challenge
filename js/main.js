const buttonNext1 = document.getElementById('next1');
const buttonNext2 = document.getElementById('next2');
const buttonBack1 = document.getElementById('back1');
const buttonBack2 = document.getElementById('back2');
const buttonNext3 = document.getElementById('next3');
const buttonBack3 = document.getElementById('back3');
const buttonSubmit = document.getElementById('confirm');
const name = document.getElementById('name');
const nameError = document.querySelector(".name .step__inputs--input--error");
const email = document.getElementById('email');
const emailError = document.querySelector(".email .step__inputs--input--error");
const number = document.getElementById('phone');
const numberError = document.querySelector(".number .step__inputs--input--error");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{11}$/;
const monthlySub = document.getElementById('monthly-sub');
const monthlyArcade = document.getElementById('monthly-arcade');
const subInputs = document.querySelectorAll('input[name="sub"]');
const planInputs = document.querySelectorAll('input[name="plan"]');
const monthlyPlanLabel = document.querySelector('label[for="monthly-sub"].plan-label');
const yearlyPlanLabel = document.querySelector('label[for="yearly-sub"].plan-label');
const monthlyCard = document.querySelector('.step__inputs__cards .monthly');
const yearlyCard = document.querySelector('.step__inputs__cards .yearly');
const monthlyInputsAdons = document.querySelectorAll('input[name="monthly-plan-ads"]');
const yearlyInputsAdons = document.querySelectorAll('input[name="yearly-plan-ads"]');
const planName = document.querySelector('.plan--name')
const planSub  = document.querySelector('.plan--sub')
const planPrice = document.querySelector('.plan--price')
const addedPlans = document.querySelector('.added-plans')
const plansTotalSub = document.querySelector('.plans-total--sub')
var sub = '';
var plan = '';
var adons = [];
var planPriceValue = 0;

var dataEntered = {
    name: '',
    email: '',
    number: '',
    sub,
    plan,
    adons
}
buttonNext1.addEventListener('click', () => {
    checkEmpty(name, nameError);
    checkEmpty(email, emailError);
    checkEmpty(number, numberError);
    checkEmail(email, emailError);
    checkNumber(number, numberError);
    if (checkEmpty(name, nameError) && checkEmpty(email, emailError) && checkEmpty(number, numberError) && checkEmail(email, emailError) && checkNumber(number, numberError)) {
        dataEntered.name = name.value;
        dataEntered.email = email.value;
        dataEntered.number = number.value;
        document.querySelector('#step1').classList.add('hidden');
        document.querySelector('#step2').classList.remove('hidden');
        document.querySelector('.stepper__options--option-one .stepper__option--circle').classList.remove('active');
        document.querySelector('.stepper__options--option-two .stepper__option--circle').classList.add('active');
        if (sub === '') {
            monthlySub.checked = true;
            monthlyArcade.checked = true;
            planPriceValue = monthlyArcade.dataset.price;
            dataEntered.planPriceValue = planPriceValue;
            setSubscription();
            setPlan(sub);
        }
    }
})
buttonBack1.addEventListener('click', () => {
    document.querySelector('#step1').classList.remove('hidden');
    document.querySelector('#step2').classList.add('hidden');
    document.querySelector('.stepper__options--option-one .stepper__option--circle').classList.add('active');
    document.querySelector('.stepper__options--option-two .stepper__option--circle').classList.remove('active');
})
buttonNext2.addEventListener('click', () => {
    document.querySelector('#step2').classList.add('hidden');
    document.querySelector('#step3').classList.remove('hidden');
    document.querySelector('.stepper__options--option-two .stepper__option--circle').classList.remove('active');
    document.querySelector('.stepper__options--option-three .stepper__option--circle').classList.add('active');
    if(sub === 'monthly'){
        document.querySelector('.monthly-checks').classList.remove('hidden');
        document.querySelector('.yearly-checks').classList.add('hidden');
    }else if(sub === 'yearly'){
        document.querySelector('.monthly-checks').classList.add('hidden');
        document.querySelector('.yearly-checks').classList.remove('hidden');
    }
})
buttonBack2.addEventListener('click', () => {
    document.querySelector('#step2').classList.remove('hidden');
    document.querySelector('#step3').classList.add('hidden');
    document.querySelector('.stepper__options--option-two .stepper__option--circle').classList.add('active');
    document.querySelector('.stepper__options--option-three .stepper__option--circle').classList.remove('active');  
})
buttonNext3.addEventListener('click', () => {
    showData();
    document.querySelector('#step3').classList.add('hidden');
    document.querySelector('#step4').classList.remove('hidden');
    document.querySelector('.stepper__options--option-three .stepper__option--circle').classList.remove('active');
    document.querySelector('.stepper__options--option-four .stepper__option--circle').classList.add('active');
})
buttonBack3.addEventListener('click', () => {
    document.querySelector('#step3').classList.remove('hidden');
    document.querySelector('#step4').classList.add('hidden');
    document.querySelector('.stepper__options--option-three .stepper__option--circle').classList.add('active');
    document.querySelector('.stepper__options--option-four .stepper__option--circle').classList.remove('active');
})
buttonSubmit.addEventListener('click', () => {
    document.querySelector('#step4').classList.add('hidden');
    document.querySelector('#step5').classList.remove('hidden');
})


checkEmpty = (input, error) => {
    if (input.value === '') {
        error.innerHTML = 'This field is required';
        input.classList.add('error');
        return false;
    } else {
        error.innerHTML = '';
        input.classList.remove('error');
        return true;
    }
}
checkEmail = (input, error) => {
    if (emailRegex.test(input.value) ===false) {
        error.innerHTML = 'Please enter a valid email address';
        input.classList.add('error');
        return false;
    } else {
        error.innerHTML = '';
        input.classList.remove('error');
        return true;
    }
}
checkNumber = (input, error) => {
    if (phoneRegex.test(input.value) ===false) {
        error.innerHTML = 'Please enter a valid phone number';
        input.classList.add('error');
        return false;
    } else {
        error.innerHTML = '';
        input.classList.remove('error');
        return true;
    }
}
setSubscription = () => {
    sub = document.querySelector('input[name="sub"]:checked').value;
    dataEntered.sub = sub;
}
setPlan = (sub) => {
    if(sub){
        plan = document.querySelector(`input[name='plan']:checked`).value;
        dataEntered.plan = plan;
    }
}
chooseSubscription = () => {
    setSubscription();

    if (sub === 'monthly') {
        document.querySelector('#monthly-sub').checked = true;
        document.querySelector('#yearly-sub').checked = false;
        document.querySelector(`#monthly-${plan}`).checked = true;
        document.querySelector(`#yearly-${plan}`).checked = false;
        planPriceValue = document.querySelector(`#monthly-${plan}`).dataset.price;
        dataEntered.planPriceValue = planPriceValue;
        yearlyCard.classList.add('hidden');
        monthlyCard.classList.remove('hidden');
        checkAvailableMonthlyAdons();
        showData();
    } else if (sub === 'yearly') {
        document.querySelector('#monthly-sub').checked = false;
        document.querySelector('#yearly-sub').checked = true;
        document.querySelector(`#monthly-${plan}`).checked = false;
        document.querySelector(`#yearly-${plan}`).checked = true;
        planPriceValue = document.querySelector(`#yearly-${plan}`).dataset.price;
        dataEntered.planPriceValue = planPriceValue;
        monthlyCard.classList.add('hidden');
        yearlyCard.classList.remove('hidden');
        checkAvailableYearlyAdons();
        showData();
    }
}
capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

choosePlan = () => {
    setSubscription();
    setPlan(sub);
}
calcTotal = () => {
    var total = 0;
        total += parseInt(planPriceValue);
        adons.forEach(ad => {
            total += parseInt(ad.price);
        })
    return total;
}
showData = () => {
    planName.textContent = capitalize(dataEntered.plan)
    planSub.textContent = `(${capitalize(dataEntered.sub)})`
    if(sub === 'monthly'){
        planPrice.textContent = `$${dataEntered.planPriceValue}/mo`;
        plansTotalSub.textContent = `(per month)`
    }else {
        planPrice.textContent = `$${dataEntered.planPriceValue}/yr`
        plansTotalSub.textContent = `(per year)`
    }
    if (adons.length > 0) {
        addedPlans.innerHTML = '';
        adons.forEach(ad => {
            var ads = document.createElement('li')
            ads.classList.add('added-plans--item')
            ads.innerHTML = `<div class="added-plans--item--name">${ad.name}</div>
            <div class="added-plans--item--price">+$${ad.price}/${sub==='monthly'? 'mo' : 'yr'}</div>`
            addedPlans.appendChild(ads)
            
        })
    } else{
        addedPlans.innerHTML = '';
    }
    var total = calcTotal();
    document.querySelector('.plans-total--price').textContent = `$${total}/${sub==='monthly'? 'mo' : 'yr'}`
}


subInputs.forEach(input => {
    input.addEventListener('change', () => {
        adons = [];
        if (input.checked) {
            if(sub === 'monthly'){
                checkMonthlyAdons();
                dataEntered.adons = adons;
                
            }else if(sub === 'yearly'){
                checkYearlyAdons();
                dataEntered.adons = adons;
                
            }
            chooseSubscription();
            monthlyPlanLabel.classList.toggle('selected');
            yearlyPlanLabel.classList.toggle('selected');
        }
    });
});
planInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (input.checked) {
            planPriceValue = input.dataset.price
            dataEntered.planPriceValue = planPriceValue
            choosePlan();
        }
    });
});
checkMonthlyAdons = () => {
    monthlyInputsAdons.forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
            const addonExists = adons.some(addon => addon.name === input.value);
            if (!addonExists) {
                adons.push({ name: input.value, price: input.dataset.price });
                dataEntered.adons = adons;
            }
            } else if (!input.checked) {
                adons = adons.filter(addon => addon.name !== input.value);
            }
        });
    });
}
checkAvailableMonthlyAdons = () => {
    monthlyInputsAdons.forEach(input => {
            if (input.checked) {
            const addonExists = adons.some(addon => addon.name === input.value);
            if (!addonExists) {
                adons.push({ name: input.value, price: input.dataset.price });
                dataEntered.adons = adons;
            }
            } else if (!input.checked) {
                adons = adons.filter(addon => addon.name !== input.value);
            }
    });
}
checkYearlyAdons = () => {
    yearlyInputsAdons.forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
            const addonExists = adons.some(addon => addon.name === input.value);
            if (!addonExists) {
                adons.push({ name: input.value, price: input.dataset.price });
                dataEntered.adons = adons;
            }
            } else if (!input.checked) {
                adons = adons.filter(addon => addon.name !== input.value);
            }
        });
    });
}
checkAvailableYearlyAdons = () => {
    yearlyInputsAdons.forEach(input => {
            if (input.checked) {
            const addonExists = adons.some(addon => addon.name === input.value);
            if (!addonExists) {
                adons.push({ name: input.value, price: input.dataset.price });
                dataEntered.adons = adons;
            }
            } else if (!input.checked) {
                adons = adons.filter(addon => addon.name !== input.value);
            }
    });
}
checkMonthlyAdons();
checkYearlyAdons();
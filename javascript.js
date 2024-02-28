let body = document.querySelector("body"),
    radio = document.querySelectorAll('input[type="radio"'),
    thumb = document.querySelector(".thumb");
const theme = {
    0: "theme-one",
    1: "theme-two",
    2: "theme-three"
}
radio.forEach((Element, index) => {
    Element.addEventListener("click", () => {
        for (let i = 0; i < 3; i++)
            body.classList.remove(theme[i]);
        body.classList.add(theme[index]);
        thumb.style.translate = index + 0.4 + "rem";
    })
})
/////////////////////////////////////////////////////////////
let numbers = document.querySelectorAll(".number"),
    screen = document.querySelector("input[type='text']"),
    form = document.querySelector("form"),
    buttons = document.querySelectorAll(".btn-cntr button"),
    operator = document.querySelectorAll(".op"),
    error = document.querySelector(".error"),
    reset = document.querySelector("#reset"),
    equal = document.querySelector("#equal"),
    delet = document.querySelector("#delete");
const regexNum = /^[\d\+\-\*\.\/]+$/;
const regexOperators = /[\+\-\*\/]/;
const dotRegex = /[\.\/]/;
const basicOperators = ['+', '-', '*', '/'];

buttons.forEach((Element) => {
    Element.addEventListener("click", () => {
        screen.focus();
        error.classList.remove("oher");
        error.innerHTML = " ";
        inputRecevior(Element.innerHTML);
    })
});

equal.addEventListener("click", () => {
    bodmass();
});
reset.addEventListener("click", () => {
    screen.value = "";
})
delet.addEventListener("click", () => {
    if (screen.value.length > 0) {
        screen.value = screen.value.slice(0, -1);
    }
})
function inputRecevior(element) {
    const isValidInput = regexNum.test(element);
    const isValidopertor = regexOperators.test(element);
    const isDot = dotRegex.test(element);
    if (isValidInput) {

        if (isValidopertor) {
            inputValidetor(element);
        }
        else if (isDot)
            dot();
        else {
            if (screen.value == "0")
                screen.value = element;
            else
                screen.value = screen.value + element;
        }
    }
}
function inputValidetor(op) {
    if (op == "-" || op == '+') {
        if (Number(screen.value.length) == 1 && basicOperators.includes(screen.value)) {
            error.classList.add("oher");
            error.innerHTML = "enter number first";
            return false;
        }
        else
            if (tchecker()) {
                error.innerHTML = "triple operator at once! ";
                error.classList.add("oher");
                return false;
            }
            else {
                screen.value = screen.value + op;
                error.classList.remove("oher");
                error.innerHTML = " ";
                return true;
            }
    }

    else {
        if (screen.value.trim() === "") {
            error.classList.remove("oher");
            error.innerHTML = "enter number first";
            return false;
        }
        else if (checker()) {
            error.innerHTML = "double operator at once! ";
            error.classList.add("oher");
            return false;
        }
        else {
            screen.value = screen.value + op;
            error.classList.remove("oher");
            error.innerHTML = " ";
            return true;
        }
    }
}
function dot() {
    if (screen.value.trim() === "")
        screen.value = 0.;
    else if (dotRegex.test(screen.value) && regexOperators.test(screen.value)) {
        let lastIndex = -1;
        operator.forEach((op) => {
            if (screen.value.includes(op.innerHTML)) {
                let opIndex = screen.value.lastIndexOf(op.innerHTML);
                if (opIndex > lastIndex)
                    lastIndex = opIndex;
            }
        })
        let lastnum = screen.value.substring(lastIndex + 1);
        if (dotRegex.test(lastnum)) {
            error.innerHTML = "double dot! ";
            error.classList.add("oher");
        }
        else {
            screen.value = screen.value + ".";
            let num1 = Number(screen.value);
            error.classList.remove("oher");
            error.innerHTML = " ";
        }
    }
    else if (dotRegex.test(screen.value)) {
        error.innerHTML = "double dot! ";
        error.classList.add("oher");
    }
    else {
        screen.value = screen.value + ".";
        error.classList.remove("oher");
        error.innerHTML = " ";
    }

}
function checker() {
    for (let i = 0; i < operator.length; i++) {
        if (screen.value.endsWith(operator[i].innerHTML)) {
            return true;
        }
    }
}
function tchecker() {
    let indexx = screen.value.length;
    let inputt = Array.from(screen.value);
    for (let i = 0; i < operator.length; i++) {
        if (inputt[indexx - 1] == operator[i].innerHTML) {
            for (let j = 0; j < operator.length; j++) {
                if (inputt[indexx - 2] == operator[j].innerHTML) {
                    return true;
                }
            }
        }
    }
}
function OperandHolder(data, oprtor) {
    let opreand1, opreand2, right, left, result;
    let lastIndex, flagnegative = true, ngtv = false, opIndex,
        divid;

    while (data.indexOf("+-") != -1) {
        data = data.replace("+-", "-");

    }
    while (data.indexOf("--") != -1) {
        data = data.replace("--", "+");

    } while (data.indexOf("-+") != -1) {
        data = data.replace("+-", "-");

    }
    divid = data.indexOf(oprtor);
    while (divid > -1) {
        console.log("data "+data);
        console.log(typeof data);
        flagnegative = false;
        let otherdivid = -1;
        if (divid == 0) {
            otherdata = data.slice(1, data.length + 1);
            if (otherdata.indexOf(oprtor) != -1) {
                otherdivid = otherdata.indexOf(oprtor);
                flagnegative = true;
                break;
            }
        }
        if ((!flagnegative && divid == 0))
            break;
        if (flagnegative)
            divid = otherdivid + 1;
        let subnum1 = data.substring(0, divid);
        let subnum2 = data.substring(divid+1,data.length);
        lastIndex = -1;
        operator.forEach((op) => {
            if (subnum1.includes(op.innerHTML)) {
                let opIndex = subnum1.lastIndexOf(op.innerHTML);
                if (opIndex > lastIndex)
                    lastIndex = opIndex;
            }
        })

        if (lastIndex > 0) {
            opreand1 = Number(subnum1.substring(lastIndex + 1));
            left = subnum1.substring(0, lastIndex + 1);
        }
        else {
            if (subnum1[0] == "+")
                opreand1 = Number(subnum1.slice(1));
            if (subnum1[0] == "-")
                opreand1 = subnum1;
            else
                opreand1 = Number(subnum1);
            left = "";
        }
        lastIndex = -1;
        let indeoperand2 = Number(subnum2.length) + 1;
        operator.forEach((op) => {
            if (subnum2.includes(op.innerHTML)) {
                opIndex = subnum2.indexOf(op.innerHTML);
                if (opIndex < indeoperand2)
                    indeoperand2 = opIndex;
            }

        })
        if (indeoperand2 != subnum2.length + 1)
            lastIndex = indeoperand2;
        if (lastIndex == 0) {
            if (subnum2[lastIndex] == "-")
                ngtv = true;
            subnum2 = subnum2.slice(1);
            operator.forEach((op) => {
                if (subnum2.includes(op.innerHTML)) {
                    let opIndex = subnum2.indexOf(op.innerHTML);
                    lastIndex = opIndex;
                }
            })
            if (lastIndex > 0) {
                opreand2 = subnum2.substring(0, lastIndex);
                right = subnum2.substring(lastIndex, subnum2.length);
            }
            else {
                right = "";
                opreand2 = subnum2;
            }
        }
        else if (lastIndex > 0) {
            opreand2 = subnum2.substring(0, lastIndex);
            right = subnum2.substring(lastIndex, subnum2.length);
        }
        else {
            right = "";
            opreand2 = subnum2;
        }
        console.log("divid "+divid);
        console.log("subnum1 "+subnum1);
        console.log("opreand1 "+opreand1);
        console.log("left "+left )
        console.log("opretpr "+oprtor)
        console.log("opreand2 "+opreand2);
        console.log("subnum2 "+opreand2);
        console.log("right "+right);


        if (opreand1[0] == "-" && !ngtv) {
            opreand1 = Number(opreand1.slice(1));
            opreand2 = Number(opreand2);
            switch (oprtor) {

                case '*':
                    result = -(opreand1 * opreand2);
                    break;
                case '/':
                    result = -(opreand1 / opreand2);
                    break;
                case '+':
                    result = opreand2 - opreand1;
                    break;
                case '-':
                    result = -(opreand1 + opreand2);
                    break;
                default:
                    break;
            }
        }
        else if (opreand1[0] == "-" && ngtv) {
            opreand2 = Number(opreand2);
            opreand1 = Number(opreand1.slice(1));
            switch (oprtor) {
                case '*':
                    result = opreand1 * opreand2;
                    break;
                case '/':
                    result = opreand1 / opreand2;
                    break;
                case '+':
                    result = -(opreand1 + opreand2);
                    break;
                case '-':
                    result = opreand2 - opreand1;
                    break;
                default:
                    break;
            }
        }
        else if (opreand1[0] != "-" && ngtv) {
            opreand2 = Number(opreand2);
            opreand1 = Number(opreand1);
            switch (oprtor) {
                case '*':
                    result = -(opreand1 * opreand2);
                    break;
                case '/':
                    result = -(opreand1 / opreand2);
                    break;
                case '+':
                    result = opreand2 - opreand1;
                    break;
                case '-':
                    result = -(opreand1 + opreand2);
                    break;
                default:
                    break;
            }
        }
        else {
            opreand2 = Number(opreand2);
            opreand1 = Number(opreand1);

            switch (oprtor) {

                case '*':
                    result = opreand1 * opreand2;
                    break;
                case '/':
                    result = opreand1 / opreand2;
                    break;
                case '+':
                    result = opreand1 + opreand2;
                    break;
                case '-':
                    result = opreand1 - opreand2;
                    break;
                default:
                    break;
            }
        }
        if (result < 0) {
        }
        data = left + result + right;
        divid = data.indexOf(oprtor);
        console.log(typeof data);
    }
    return data;
}
function bodmass() {
    let data = screen.value;
    data = OperandHolder(data, "/");
    data = OperandHolder(data, "*");
    data = OperandHolder(data, "-");
    data = OperandHolder(data, "+");
    screen.value = data;
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        bodmass();

    }
});
screen.addEventListener('input', function (event) {
    const allowedCharacters = /^[0-9\+\-\*\.\/]*$/;
    const input = event.target.value;
    error.classList.remove("oher");
    error.innerHTML = " ";
    if (!allowedCharacters.test(input)) {
        event.target.value = input.slice(0, -1);
    }
});
screen.addEventListener('keypress', function (event) {
    const key = event.key;
    error.classList.remove("oher");
    error.innerHTML = " ";
    if (basicOperators.includes(key)) {
        event.preventDefault();
        inputRecevior(key);
    }
});


















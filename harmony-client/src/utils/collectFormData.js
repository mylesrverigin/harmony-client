const parseInputs = (className) => {
    let fields = document.querySelectorAll(`.${className}`);
    let map = {}

    fields.forEach(el=>{
        map[el.name] = el.value
    })

    return map;
}

const parseCheckbox = (className) => {
    let fields = document.querySelectorAll(`.${className}`);
    let map = {}

    fields.forEach(el=>{
        map[el.name] = el.checked
    })

    return map;
}

export {parseInputs,parseCheckbox};
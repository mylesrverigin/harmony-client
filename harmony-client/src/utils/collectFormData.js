const parseInputs = (className) => {
    let fields = document.querySelectorAll(`.${className}`);
    let map = {}

    fields.forEach(el=>{
        map[el.name] = el.value
    })

    return map;
}

const parseCheckbox = (className) => {

}

export {parseInputs,parseCheckbox};
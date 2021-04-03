const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
//functions:
const generateTodo = textInput=>{
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${textInput}</span>
    <i class="fa fa-trash delete"></i>
    </li>
    `;

    list.innerHTML += html;
}
const filterTodos = (term)=> {
    
    Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter(todo =>  todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};
//add todo
addForm.addEventListener('submit', e=>
{
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length)
        generateTodo(todo);
    addForm.reset();

                 
});
//delete todo
list.addEventListener('click', e =>
{
    if(e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove();
    }
})
//keyup
search.addEventListener('keyup', ()=>
{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
})
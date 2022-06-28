const KEYS = {
    Filme: 'Filme',
    employeeId: 'employeeId'
}

export const getGeneroCollection = () => ([
    { id: '1', title: 'Comedia' },
    { id: '2', title: 'Terror' },
    { id: '3', title: 'Romance' },
    { id: '4', title: 'Infantil' },
])

export function insertEmployee(data) {
    let Filme = getAllFilme();
    data['id'] = generateEmployeeId()
    data['date'] = '28/06/2022'
    Filme.push(data)
    localStorage.setItem(KEYS.Filme, JSON.stringify(Filme))
}

export function updateEmployee(data) {
    let Filme = getAllFilme();
    let recordIndex = Filme.findIndex(x => x.id === data.id);
    Filme[recordIndex] = { ...data }
    localStorage.setItem(KEYS.Filme, JSON.stringify(Filme));
}

export function deleteEmployee(id) {
    let Filme = getAllFilme();
    Filme = Filme.filter(x => x.id !== id)
    localStorage.setItem(KEYS.Filme, JSON.stringify(Filme));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllFilme() {
    if (localStorage.getItem(KEYS.Filme) == null)
        localStorage.setItem(KEYS.Filme, JSON.stringify([]))
    let Filme = JSON.parse(localStorage.getItem(KEYS.Filme));
    let genres = getGeneroCollection();
    return Filme.map(x => ({
        ...x,
        genre: genres[x.genreId - 1].title
    }))
}
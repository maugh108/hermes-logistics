const persons = ({persons}) => {
    return (
        <div>
            <h2>Personas</h2>
            {persons.map(p => 
                <div key={p._id}>
                    {p.name} - {p.age}
                </div>
            )}
        </div>
    )
}

export default persons
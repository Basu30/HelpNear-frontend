
const JobForm = () => {
    return (
        <main>
            <form>
                <label>Category</label>
                <input type="text" placeholder="Please enter category"/>
                <input type="text" placeholder="Title"/>
                <input type="text" placeholder="Description"/>
                <input type='number' placeholder="Minumum budget"/>
                <input type="number" placeholder="Maximum budget"/>
                <input type="text" placeholder="City"/>
                <input type="text" placeholder="District"/>
                <input type="text" placeholder="Address"/>
                <input type="date" placeholder="Preferred date"/>
                <input type="date" placeholder="Preferred time"/>
                <input type="text" placeholder=""/>
                <input type="text" placeholder=""/>

                </form>
        </main>
    )
}

export default JobForm;
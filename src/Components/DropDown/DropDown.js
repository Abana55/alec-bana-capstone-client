import X from '../../assets/icons/close-24px.svg'
import axios from 'axios';
import './DropDown.scss';



function NavModal({ openDelete, inventory }) {
    let deleteInventory = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/inventories/${inventory.id}`);
            openDelete(false);
            window.location.reload();
        }
        catch (error) {
            console.error(error);
        }
    };
    return (
        <section className='delete-inventory__background'>
        <div className='delete-inventory__container'>
            <div className='delete-inventory__close-button'>
                <img src={X} alt='X to cancel out of delete' onClick={() => { openDelete(false); }}>
                </img>
            </div>
            <div className='delete-inventory__header'>
                {`Delete ${inventory.item_name} inventory?`}
            </div>
            <div className='delete-inventory__buttons-bottom'>
                <div className='delete-inventory__buttons'>
                    <button className='delete-inventory__buttons-cancel' onClick={() => { openDelete(false); }}>
                        Cancel
                    </button>
                    <button className='delete-inventory__buttons-delete'
                        onClick={deleteInventory}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </section>
    );
}


export default NavModal;
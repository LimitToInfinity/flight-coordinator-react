import { useDispatch, useSelector } from 'react-redux';

import '../Stylesheets/Modal.scss';

function Modal() {

  const dispatch = useDispatch();

  const InnerComponent = useSelector(state => state.modal.innerComponent);

  const closeModal = () => {
    dispatch({ type: 'UNSET_FLIGHT' });
    dispatch({ type: 'HIDE_MODAL' });
  }

  return (
    <section className='modal'>
      <div className='overlay' onClick={ closeModal }></div>
      <div className='modal-content'>
        <button className='close-modal' onClick={ closeModal }>X</button>
        <InnerComponent closeModal={closeModal} />
      </div>
    </section>
  );
}

export default Modal;
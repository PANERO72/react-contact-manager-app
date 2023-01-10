import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { ContactService } from '../../Services/ContactService';
import Swal from 'sweetalert2';
import './ContactList.css';

function ContactList() {
	let [state, setState] = useState({
		loading: false, contacts: [], filteredContacts: [], errorMessages: null, response_error: null
	});

	let [search, setSearch] = useState({
		searchInput: ''
	});

	const loadContacts = useCallback(async () => {
		try {
			setState({...state, loading: true});
			let response = await ContactService.getAllContacts();
			setState({...state, loading: false, contacts: response.data, filteredContacts: response.data});
			console.log(response.data);
		} catch (error) {
			setState({...state, loading: false, errorMessages: error.message});
		}
	},[]);

	useEffect(() => {
		loadContacts();
	},[]);

	let deleteContactForm = async (contactId) => {
		try {
			let response = await ContactService.deleteContact(contactId);
			if (response) {
				setState({...state, loading: true});
				let response = await ContactService.getAllContacts();
				setState({...state, loading: false, contacts: response.data,filteredContacts: response.data});
			}
		} catch (error) {
			setState({...state, errorMessages: error.message}); 
		}
	}

	let showAlertDelete = (contactId) => {

		Swal.fire({
			title: '¡Atención!',
			text: "¿Desea eliminar este contacto?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				deleteContactForm(contactId);
			}
		});
    }

	let searchContact = (event) => {
		setSearch({...search, searchInput: event.target.value});

		let theContacts = state.contacts.filter(contact => {
			return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
			
		});
		setState({...state, filteredContacts: theContacts});
	}

	let {loading, contacts, filteredContacts, errorMessages} = state;

	return (
		<>
		<div className={contacts ? 'mt-4' : 'ContactList-hg-805'}>
			<section className='contact-search'>
				<div className='container-fluid mx-auto ContactList-wd-80'>
					<div className="row">
						<div className="col">
							<p className='h3'>Lista de Contactos <Link to={'/contacts/create'} className="btn btn-primary ContactList-fs-14"><i className='fa fa-plus-circle'></i> <span className='ms-1'>Nuevo Contacto</span></Link></p>
						</div>
					</div>
					<div className="d-flex my-3">
						<p className="fst-italic text-black-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatibus tenetur architecto exercitationem eveniet iusto nisi perferendis et recusandae soluta quidem impedit, assumenda reprehenderit ex cumque odio laborum! Nemo, perspiciatis. Reiciendis eos ab assumenda voluptates esse velit eligendi, illum ullam beatae suscipit, ducimus eius! Sequi doloremque earum tenetur ullam, autem praesentium nesciunt.</p>
					</div>
					<div className="d-flex my-3"> 
						<form className="d-flex" role="search">
							<input className="form-control me-2" type="search" placeholder="Escriba su búsqueda..." name='search' value={search.searchInput} onChange={searchContact} aria-label="Search" />
							<button className="btn btn-outline-dark" type="submit">Buscar</button>
						</form>
					</div>
				</div>
			</section>
			{loading ? <div className="container">
					<div className="row">
						<div className="col">
							<Spinner></Spinner>
						</div>
					</div>
				</div> : <section className='contact-list'>
				<div className="container-fluid mx-auto ContactList-wd-80">

					{filteredContacts ? <div className="row my-5 ContactList-mx-8">
						<div className="row">
							<div className="col text-center mb-4">
								<p className='h5'>Número de Contactos: <span className='ms-1'>{filteredContacts.length}</span></p>
							</div>
						</div>
						{filteredContacts.length > 0 && filteredContacts.map(contact => {
							return (<div className="col-md-4" key={contact.id}>
							<div className="card mb-3 shadow-lg" /*style={{maxWidth: '540px', width: '520px'}}*/>
								<div className="card-body align-items-md-center pe-0">
									<div className="row g-0">
										<div className="col-md-3">
											{/* <img src="/assets/img/contacts/contact-foto-1.png" className="ContactList-card-imagen rounded-start" alt="Foto contacto" /> */}
											<img src={contact.photoURL} className="ContactList-card-imagen rounded-start" alt="Foto contacto" />
										</div>
										<div className="col-md-7 ms-3">
											<ul className="list-group mt-1 ContactList-fs-15">
												<li className="list-group-item">Nombre: <span className="fw-bold me-1">{contact.name}</span></li>
												<li className="list-group-item">Tel. móvil: <span className="fw-bold me-1">{contact.mobile}</span></li>
												<li className="list-group-item">Tel. fijo: <span className="fw-bold me-1">{contact.phone}</span></li>
												<li className="list-group-item">Correo: <span className="fw-bold me-1">{contact.email}</span></li>
											</ul>
										</div>
										<div className="col-md-1">
											<ul className="list-unstyled">
												<li className="ContactList-mt-10px ms-2">
													<Link to={`/contacts/view/${contact.id}`} className="btn btn-primary ContactList-ptb-2 ContactList-plr-8">
														<i className="fa fa-eye"></i>
													</Link>
												</li>
												<li className="ContactList-mt-10px ms-2">
													<Link to={`/contacts/edit/${contact.id}`} className="btn btn-success ContactList-ptb-2 ContactList-plr-8">
														<i className="fa fa-pencil"></i>
													</Link>
												</li>
												<li className="ContactList-mt-10px ms-2"> 
													<button type="button" className="btn btn-danger ContactList-ptb-2 ContactList-plr-8" onClick={() => showAlertDelete(contact.id)}>
														<i className="fa fa-trash"></i>
													</button>
													{/* <button type="button" className="btn btn-danger ContactList-ptb-2 ContactList-plr-8">
														<i className="fa fa-trash"></i>
													</button> */}
												</li>
											</ul>                           
										</div>
									</div>
								</div>
							</div>
						</div>)
						})}
					</div> : <div className="row my-5 mx-auto text-center">
						<h4>No hay Contactos guardados todavía</h4>
					</div>}
				</div>
			</section>}
		</div>
	</>
	)
}

export default ContactList;
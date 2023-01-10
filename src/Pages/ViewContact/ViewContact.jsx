import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { ContactService } from '../../Services/ContactService';
import './ViewContact.css';

function ViewContact() {
	let {contactId} = useParams();

	let [state, setState] = useState({
		loading: false, contact: {}, group: {}, errorMessages: null, response_error: null
	});

	const loadContact = useCallback(async () => {
		try {
			setState({...state, loading: true});
			let response = await ContactService.getContact(contactId);
			let groupResponse = await ContactService.getGroup(response.data);
			setState({...state, loading: false, contact: response.data, group: groupResponse.data});
			console.log(response.data);
		} catch (error) {
			setState({...state, loading: false, errorMessages: error.message});
		}
	},[state, contactId]);

	useEffect(() => {
		loadContact();
	},[contactId]);

	let {loading, contact, group, errorMessages} = state;
  	return (
    	<>
		<div className='mt-4 ViewContact-hg-805'>
			<section className='view-contact-intro'>
				<div className='container-fluid mx-auto ViewContact-wd-80'>
					<div className="row">
						<div className="col">
							<p className='h3'>Ver Contacto</p>
						</div>
					</div>
					<div className="d-flex my-3">
						<p className="fst-italic text-black-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatibus tenetur architecto exercitationem eveniet iusto nisi perferendis et recusandae soluta quidem impedit, assumenda reprehenderit ex cumque odio laborum! Nemo, perspiciatis. Reiciendis eos ab assumenda voluptates esse velit eligendi, illum ullam beatae suscipit, ducimus eius! Sequi doloremque earum tenetur ullam, autem praesentium nesciunt.</p>
					</div>
				</div>
			</section>
			{loading ? <div className="container">
				<div className="row">
					<div className="col">
						<Spinner></Spinner>
					</div>
				</div>
			</div> : <section className='view-contact-details'>
				<div className="container-fluid mx-auto ViewContact-wd-80">
					{contact ? <><div className="row my-5 ViewContact-mx-8">
						<div className="col">
							<div className="card mb-3 shadow-lg m-auto" style={{maxWidth: '1200px', width: '1200px'}}>
								<div className="card-body align-items-md-center">
									<div className="row g-0">
										<div className="col ViewContact-wd-250">
											<img src={contact.photoURL} className="ViewContact-card-imagen rounded-start" alt="Foto contacto" />
										</div>
										<div className="col ViewContact-wd-475 me-3">
											<ul className="list-group mt-1">
												<li className="list-group-item">Nombre: <span className="fw-bold me-1">{contact.name}</span></li>
												<li className="list-group-item">Tel. móvil: <span className="fw-bold me-1">{contact.mobile}</span></li>
												<li className="list-group-item">Tel. fijo: <span className="fw-bold me-1">{contact.phone}</span></li>
												<li className="list-group-item">Correo: <span className="fw-bold me-1">{contact.email}</span></li>
												<li className="list-group-item">Dirección: <span className="fw-bold me-1">{contact.address}</span></li>
											</ul>
										</div>
										<div className="col ViewContact-wd-475">
											<ul className='list-group mt-1'>
												<li className="list-group-item">Fecha importante: <span className="fw-bold me-1">{contact.importantDate}</span></li>
												<li className="list-group-item">Grupo: <span className="fw-bold me-1">{group.name}</span></li>
												<li className="list-group-item">Empresa: <span className="fw-bold me-1">{contact.company}</span></li>
												<li className="list-group-item">Sitio Web/Blog: <span className="fw-bold me-1">{contact.webSite}</span></li>
												<li className="list-group-item"> <span className="fw-bold me-1"></span></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-5 mx-8">
						<div className="col mx-auto">
							<Link to="/" className="btn btn-secondary"><i className="fa fa-arrow-alt-circle-left"></i> Volver</Link>
						</div>
					</div></> : <div className="row my-5 mx-auto text-center">
						<h4>No hay Contactos guardados todavía</h4>
					</div>}
				</div>
			</section>}
		</div>
		</>
  	)
}

export default ViewContact;
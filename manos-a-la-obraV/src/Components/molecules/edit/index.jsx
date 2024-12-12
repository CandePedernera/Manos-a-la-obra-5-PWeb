import React, { useState } from 'react';
import styles from './Edit.module.css';
import { patch } from '../../../utils/apiCalls';

export default function Edit({ url,updateState }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false);

    const editTask = (e) => {
        e.preventDefault(); 

        if(name!='' || description!=''){
            const body = {
                "name": name,
                "description": description,
            };
        
            patch(url, body).then((data) => {
                console.log(data);
                setShowForm(false);
                setName('');
                setDescription('');
                updateState();
            });
        }
        else{
            setShowForm(false);
        }
    };

    return (
        <>
            <button className={styles.editButon} onClick={() => setShowForm(!showForm)}>
                eliminar
            </button>
            {showForm && (
                <div id={styles.formContainer}>
                    <h2>EDIT</h2>
                    <form onSubmit={editTask} id={styles.form}>
                        <input
                            type="text"
                            placeholder='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit">Editar</button>
                    </form>
                </div>
            )}
        </>
    );
}

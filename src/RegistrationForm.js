import React, { useState } from "react";
import Axios, * as others from "axios";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";

function RegistrationForm() {

  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const onSubmit = (data) => {

    console.log(data);
    Axios.post("http://api.arunarjunan.co.in/insert", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    alert("Registration Success");
    reset({
        firstName: "",
        lastName: "",
        email: "",
      }, {
        keepErrors: true, 
        keepDirty: true,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      });
    
  }

  return (
    <div className="container">
  <div className="col-md-8 col-md-offset-8">
    <Form onSubmit={handleSubmit(onSubmit) } className='text-start'>
        <Form.Field>
            <label>First Name</label>
            <input
                placeholder='First Name'
                type="text"
                
                {...register("firstName", { required: true, maxLength: 30 })}
            />
        </Form.Field>
        {errors.firstName && <p style={{color:'red'}}>Please check the First Name</p>}
        <Form.Field>
            <label>Last Name</label>
            <input
                placeholder='Last Name'
                type="text"
              
                {...register("lastName", { required: true, maxLength: 30 })}
            />
        </Form.Field>
        {errors.lastName && <p style={{color:'red'}}> Please check the Last Name</p>}
        <Form.Field>
            <label>Email</label>
            <input
                placeholder='Email'
                type="email"
                
                {...register("email",
                    {
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
            />
        </Form.Field>
        {errors.email && <p style={{color:'red'}}>Please check the Email</p>}
      
        <Button type='submit'>Submit</Button>
        <Button type='reset'>Reset</Button>
    </Form>
    </div>
</div>);
}
export default RegistrationForm;

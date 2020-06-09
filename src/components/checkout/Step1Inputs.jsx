import React from "react";
import InputItem from "./InputItem";
import styled from "styled-components";

import IconRut from "@/images/formulario/icon_rut.svg";
import IconUser from "@/images/formulario/icon_user.svg";
import IconPhone from "@/images/formulario/icon_phone.svg";
import IconEmail from "@/images/formulario/icon_email.svg";
import { connect } from "react-redux"

const WrapInputsInline = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
`;

const Step1Inputs = (props) => {
  return (
    <WrapInputsInline>
      <InputItem
        {...props}
        nameInput="rut"
        iconInput={IconRut}
        nameLabel="Rut"
        length="12"
        errorInfo="Ingrea un RUT válido"
        exampleInput="Ej: 12345678-5"
      />
      <InputItem
        {...props}
        nameInput="ci"
        iconInput={IconRut}
        nameLabel="Nº Serie C.I"
        length="11"
        errorInfo="Ingresa un número de serie válido"
        exampleInput="Ej: 102234428"
      />
      <InputItem
        {...props}
        nameInput="name"
        iconInput={IconUser}
        nameLabel="Nombres"
        length="50"
        exampleInput="Ej: Juan"
      />
      <InputItem
        {...props}
        nameInput="lastName"
        iconInput={IconUser}
        nameLabel="Apellidos"
        length="50"
        exampleInput="Ej: Juan"
      />
      <InputItem
        {...props}
        nameInput="phone"
        iconInput={IconPhone}
        nameLabel="Teléfono de contacto"
        length="9"
        fieldType="number"
        exampleInput="Ej: 987654321"
      />
      <InputItem
        {...props}
        nameInput="email"
        iconInput={IconEmail}
        nameLabel="Correo electrónico"
        length="50"
        fieldType="email"
        exampleInput="Ej: usuario@dominio.cl"
      />
    </WrapInputsInline>
  );
};
export default connect(
  ({ FormContent, ValidationContent }) => ({ ...FormContent, ValidationContent })
)(Step1Inputs)

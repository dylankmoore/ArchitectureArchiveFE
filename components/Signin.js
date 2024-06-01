/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div id="authpage">
      <img alt="logo" src="AALOGO.png" width="400" height="230" /><br /><br />
      <Button type="button" id="signinbtn" className="copy-btn raise" onClick={signIn}>
        Sign In
      </Button><br />
    </div>
  );
}

export default Signin;

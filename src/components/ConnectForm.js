import React, { useCallback } from 'react';
import { Button, TextField } from '@material-ui/core';

const useOnChange = (setter) => useCallback(e => setter(e.target.value), [setter])

export const ConnectForm = ({ connect, room, domain, setDomain, setRoom }) => {

  const onDomainChange = useOnChange(setDomain)
  const onRoomChange = useOnChange(setRoom)

return (
<div>
  <header>
    WELCOME TO COOPER UNION VIDEO CONFERENCING
  </header>
  <hr/>
  <form noValidate autoComplete="off" onSubmit={connect}>
    <TextField label="Jitsi instance" placeholder='https://meet.jit.si' value={domain} onChange={onDomainChange}/><br />
    <TextField label="room name" value={room} placeholder='Zoom-audio-group' onChange={onRoomChange} /><br />
    <Button type="submit" color="primary">Join</Button>
  </form>
</div>);
}

<div align="center">
    <img href="https://projecterror.dev" width="150" src="https://i.tasoagc.dev/c1pD" alt="Material-UI logo" />
</div>
<h1 align="center">NPWD Dispatcher</h1>

<div align="center">
This is a basic resource using provided NPWD APIs for redirecting phone calls and text messages from your emergency number of choice to your roleplay dispatchers.
</div>

<div align="center">

[![license](https://img.shields.io/github/license/Mojito-Fivem/npwd-dispatch?style=for-the-badge)](https://github.com/mojito-fivem/npwd-dispatch/master/LICENSE)
![GitHub all releases](https://img.shields.io/github/downloads/mojito-fivem/npwd-dispatch/total?style=for-the-badge)
</div>

## Setup and Configuration

### Prerequisites
This is a **standalone** resource using only npwd APIs and fivem natives so there are no framework dependencies and works off of convars and ace permissions.
However, NPWD version 1.3.3 or newer is required.

### Define your emergency number
This will be the phone number that all calls and messages will be redirected from, by default it is '911'.
You can defined your own emergency number by setting the following convar in your server.cfg:

```cfg
set npwd_dispatch_number 999
```

### Dispatcher Permissions
To use the command `/dispatchduty` the ace permission `command.dispatchduty` is needed, this can be assigned to a player or inherited through a group.
```cfg
add_principal identifier.license:abcd12345 command.dispatchduty allow # Individual
add_principal group.dispatch command.dispatchduty allow # Group inheritence
```
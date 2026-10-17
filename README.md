## Overview

This plugin adds simple autosave functionality to document, spreadsheet, presentation and PDF editors.
In the settings you can set your preferred autosave interval in minutes (minimum 1, maximum 35000 minutes).

### Installation:

Install the plugin according to the [official ONLYOFFICE plugin installation guides for Desktop Editors][1].

### Configuration:

While the plugin is running, open the settings with the *Autosave* button in the *Plugins* tab (requires ONLYOFFICE 8.1 or later).
While the plugin is stopped, the settings are available via *Plugins* tab > *Background plugins* > *Autosave* > *Settings*.
A changed interval is applied immediately, no restart of the plugin is required.

### Note

* Usage of low intervals can interrupt the workflow, recommend having at least 5 minutes between saves.
* For newly created documents a saving dialog will appear according to the defined interval.

### Known issues

* The *Settings* entry in the *Background plugins* list does nothing while the plugin is running, because the editor does not start a second variation of a running plugin. Use the *Autosave* button in the *Plugins* tab instead.

[1]: https://api.onlyoffice.com/docs/plugins/development-workflow/installing-and-testing/desktop-editors-installation/
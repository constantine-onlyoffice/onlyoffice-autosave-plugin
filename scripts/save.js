(function (window, undefined) 
{
  const STORAGE_KEY = "plugin-save-interval";
  const DEFAULT_MINUTES = 5;
  const MAX_MINUTES = 35000;
  const SETTINGS_BUTTON_ID = "autosave-settings";

  let timer = null;
  let settingsWindow = null;
  let toolbarButtonAdded = false;

  function getIntervalMs() 
  {
    const minutes = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    const valid = Number.isInteger(minutes) && minutes >= 1 && minutes <= MAX_MINUTES;

    return (valid ? minutes : DEFAULT_MINUTES) * 60000;
  }

  // Re-reads the interval on every run, so a changed setting is picked up
  // without restarting the plugin
  function schedule() 
  {
    clearTimeout(timer);
    timer = setTimeout(function () 
    {
      Asc.plugin.callCommand( function () {Api.Save();} );
      schedule();
    }, getIntervalMs());
  }

  function getToolbarButton() 
  {
    return {
      guid: window.Asc.plugin.guid,
      tabs: [
        {
          id: "plugins",
          items: [
            {
              id: SETTINGS_BUTTON_ID,
              type: "button",
              text: window.Asc.plugin.tr("Autosave"),
              hint: window.Asc.plugin.tr("Autosave settings"),
              icons:
                "resources/%theme-type%(light|dark)/icon%scale%(default).%extension%(png)",
              lockInViewMode: false,
            },
          ],
        },
      ],
    };
  }

  // The editor refuses to start the "Settings" variation while the background
  // variation of the same plugin is running, so the running plugin offers
  // its own toolbar button and opens the settings as a child window
  function addToolbarButton() {
    window.Asc.plugin.executeMethod("AddToolbarMenuItem", [getToolbarButton()]);
    toolbarButtonAdded = true;
  }

  function openSettings() {
    if (settingsWindow) {
      settingsWindow.activate();
      return;
    }

    settingsWindow = new window.Asc.PluginWindow();
    settingsWindow.attachEvent("onSettingsSaved", function () {
      closeSettings();
      schedule();
    });
    settingsWindow.show({
      url: "settings.html",
      description: window.Asc.plugin.tr("Autosave settings"),
      isVisual: true,
      isModal: true,
      EditorsSupport: ["word", "cell", "slide", "pdf"],
      buttons: [{ text: "OK", primary: true }],
      size: [300, 85],
    });
  }

  function closeSettings() {
    if (!settingsWindow) return;
    settingsWindow.close();
    settingsWindow = null;
  }

  window.Asc.plugin.init = function () {
    schedule();
    addToolbarButton();
    window.Asc.plugin.attachToolbarMenuClickEvent(SETTINGS_BUTTON_ID, openSettings);

    // Fired when another window writes a new value: restart the timer
    // right away instead of waiting for the next save
    window.addEventListener("storage", function (e) {
      if (e.key === STORAGE_KEY) schedule();
    });
  };

  // Translations load asynchronously, so update the button text once they are available
  window.Asc.plugin.onTranslate = function () {
    if (toolbarButtonAdded) {
      window.Asc.plugin.executeMethod("UpdateToolbarMenuItem", [getToolbarButton()]);
    }
  };

  window.Asc.plugin.button = function (id, windowId) {
    if (windowId) {
      if (id === 0 && settingsWindow) settingsWindow.command("onOk");
      else closeSettings();
      return;
    }
    this.executeCommand("close", "");
  };
})(window, undefined);

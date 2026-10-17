(function (window, undefined) 
{
  const STORAGE_KEY = "plugin-save-interval";
  let interval;

  $(document).ready(function () 
  {
    interval = document.querySelector("#interval");

    let saved_interval = localStorage.getItem(STORAGE_KEY);
    if (saved_interval) $(interval).val(saved_interval);

    interval.oninput = function () 
    {
      if (interval.checkValidity()) 
      {
        $(".t-input-wrap").removeClass("is-error");
        $(".t-input").removeClass("is-error");
      }
    };
  });

  window.Asc.plugin.onTranslate = function () 
  {
    let error = document.getElementById("t-error-msg");

    if (error) 
    {
      error.innerHTML = window.Asc.plugin.tr("Enter whole positive number");
    }

    let interval_label = document.getElementById("interval_label");

    if (interval_label) 
    {
      interval_label.innerHTML = window.Asc.plugin.tr("Set interval (in minutes)");
    }
  };

  window.Asc.plugin.init = function () {};

  // Opened as a child window of the running background plugin
  window.Asc.plugin.attachEvent("onOk", function () { save(); });

  // Started as the standalone "Settings" variation while the plugin is stopped
  window.Asc.plugin.button = function (id) 
  {
    // Only the OK button saves; closing the window discards the input
    if (id !== 0) 
    {
      this.executeCommand("close", "");
      return;
    }

    save();
  };

  function save() 
  {
    if (interval.checkValidity()) 
    {
      localStorage.setItem(STORAGE_KEY, parseInt(interval.value, 10));

      if (window.Asc.plugin.windowID) 
      {
        window.Asc.plugin.sendToPlugin("onSettingsSaved");
      } 
      else
      {
        window.Asc.plugin.executeCommand("close", "");
      }
    } 
    else 
    {
      $(".t-input-wrap").addClass("is-error");
      $(".t-input").addClass("is-error");
      $(".t-input").removeClass("is-shaking");
      $(".t-input").addClass("is-shaking");

      var shakeMs = 80 * 2 + 60 * 2;
      window.setTimeout(function () 
      {
        $(".t-input").removeClass("is-shaking");
      }, shakeMs + 20);
    }
  }

  window.Asc.plugin.onThemeChanged = function (theme) 
  {
    window.Asc.plugin.onThemeChangedBase(theme);
  };
})(window, undefined);

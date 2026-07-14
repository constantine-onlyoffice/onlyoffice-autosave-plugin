(function (window, undefined) {
  window.Asc.plugin.init = function () {
    initLocalStorage();
    Run();
  };

  function initLocalStorage() {
    localStorage.setItem("plugin-save-interval-default", 5);
  }

  function Run() {
    let intervalCustom = localStorage.getItem("plugin-save-interval");
    let intervalDefault = localStorage.getItem("plugin-save-interval-default");
    if (intervalCustom) {
      setInterval(function () {
        Asc.plugin.callCommand(() => {
          Api.Save();
          console.log("Saved after custom");
        });
      }, intervalCustom * 60000);
    } else {
      setInterval(function () {
        Asc.plugin.callCommand(() => {
          Api.Save();
          console.log("Saved after default");
        });
      }, intervalDefault * 60000);
    }
  }

  $(document).ready(function () {
    let saved_interval = localStorage.getItem("plugin-save-interval");
    if (saved_interval) interval = saved_interval;
  });

  window.Asc.plugin.button = function (id) {
    this.executeCommand("close", "");
  };
})(window, undefined);

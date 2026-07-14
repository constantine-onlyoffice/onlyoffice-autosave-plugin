(function (window, undefined) {
  let interval;
  let intervalValue;
  let interval_default = 5;

  $(document).ready(function () {
    interval = document.querySelector("#interval");
    intervalValue = document.querySelector(".interval-value");

    interval.onchange = function () {
      intervalValue.textContent = interval.value;
    };

    let saved_interval = localStorage.getItem("plugin-save-interval");
    if (saved_interval) {
      $(interval).val(saved_interval);
      intervalValue.textContent = saved_interval;
    } else intervalValue.textContent = interval_default;
  });

  function getMessage(key) {
    return window.Asc.plugin.tr(key.trim());
  }

  window.Asc.plugin.onTranslate = function () {
    let elements = document.getElementsByClassName("i18n");
    for (let i = 0; i < elements.length; i++) {
      let el = elements[i];
      if (el.attributes["placeholder"])
        el.attributes["placeholder"].value = getMessage(
          el.attributes["placeholder"].value,
        );
      if (el.innerText) el.innerText = getMessage(el.innerText);
    }
  };

  window.Asc.plugin.init = function () {};

  window.Asc.plugin.button = function (id) {
    if (interval.checkValidity()) {
      localStorage.setItem("plugin-save-interval", interval.value);
      this.executeCommand("close", "");
    } else {
      $(".t-input-wrap").addClass("is-error");
      $(".t-input").addClass("is-error");
      $(".t-input").removeClass("is-shaking");
      $(".t-input").addClass("is-shaking");

      var shakeMs = 80 * 2 + 60 * 2;
      window.setTimeout(function () {
        $(".t-input").removeClass("is-shaking");
      }, shakeMs + 20);
    }
  };

  window.Asc.plugin.onThemeChanged = function (theme) {
    window.Asc.plugin.onThemeChangedBase(theme);
  };
})(window, undefined);

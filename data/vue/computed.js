var items = [
    {
        header: "Вычисляемые свойства",
        content: `
          <p>Вычисляемые свойства (<spec_words>computed</spec_words>) - это реактивные данные модели, значения которых вычисляются при изменении зависимостей</p>
          <pre class = "snippet">
            data: function () {
              return {
                  pictures: [
                      "https://vuejs.org/images/tooltwist.png",
                      "https://vuejs.org/images/vueschool.png",
                      "https://vuejs.org/images/stdlib.png"
                  ],
                  currentIndex: 0,
                  currentSize: "80px"
              }
            },
            computed: {
                 imageURL: function () {
                     return this.pictures [ this.currentIndex ]
                 }
            }
          </pre><br>
          <p>Зависимости - это свойства объекта <spec_words>data</spec_words>, на основании которых рассчитывается вычисляемое свойство</p>
          <p>В примере выше это массив <var_names>pictures</var_names> и текущий индекс элемента массива <var_names>currentIndex</var_names></p>
          <p>Если реактивная система <spec_words>Vue</spec_words> отследит изменение массива <var_names>pictures</var_names> или изменится значение <var_names>currentIndex</var_names>,
              то значение вычисляемого свойства <var_names>imageURL</var_names>будет пересчитано</p>
          <p>Таким образом, меняя значение переменной модели <var_names>currentIndex</var_names>, мы сможем управлять тем, какая картинка из массива <var_names>pictures</var_names> будет выведена на страницу</p>
          <pre class = "snippet">
            <img :src = "imageURL" :style = "{ width: currentSize }">
          </pre>
        `
    },
    {
        header: "Типичные ошибки",
        content: `
          <p>Вычисляемые свойства должны иметь зависимости, т.е. быть привязаны к реактивным данным модели</p>
          <p>В противном случае их значения никогда не будут пересчитаны</p>
          <p>Нельзя объявлять одноименные реактивные свойства в объекте <spec_words>data</spec_words> и в объекте <spec_words>computed</spec_words></p>
          <p>Не забывайте, что значения вычисляемых свойств нельзя устанавливать непосредственно путем присваивания</p>
          <p>Не забывайте, что изменение значения элемента массива или свойства объекта не приводит к изменению ссылки на массив / объект, а значит, не отслеживается реактивной системой <spec_words>Vue</spec_words></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        `
    },
    {
      header: "Экземпляр Vue",
      content: `
        <p></p>
        <p></p>
        <p></p>
        <pre class = "snippet">

        </pre>
        <p></p>
        <p><spec_words>Vue</spec_words></p>
        <p><var_names></var_names></p>
        <p></p>
      `
    },
    {
      header: "",
      content: `
      <p></p>
      <p></p>
      <pre class = "snippet">

      </pre>
      <p><var_names></var_names></p>
      <pre class = "snippet">

      </pre>
      <p></p>
      <p></p>
      <pre class = "snippet">

      </pre>
      <p></p>
      `
    },
    {
      header: "",
      content: `
      <p></p>
      <p></p>
      <pre class = "snippet">

      </pre>
      <p></p>
      <p></p>
      <p></p>
      <p><spec_words></spec_words></p>
      `
    },
    {
      header: "",
      content: `
          <p></p>
          <pre class = "snippet">

          </pre>
          <p></p>
          <pre class = "snippet">

          </pre>
          <p></p>
      `
    }
]

var items = [
    {
        header: "Что такое компонент Vue",
        content: `
          <p>Компонент Vue - это объект JS</p>
          <p>Как всякий объект, он имеет прототип, и имена унаследованных ( "прототипных" ) свойств и методов
          компонента обычно начинаются с символа <spec_words>$</spec_words> или <spec_words>_</spec_words></p>
          <p>Поэтому не рекомендуется использовать эти символы в начале ваших собственных идентификаторов</p>
          <p>Значения таких свойств устанавливаются Vue при создании или рендеринге компонента, их нельзя переопределять</p>

          <p>Отличие компонента Vue от обычного объекта JS заключается в области видимости</p>
          <p>Объекту компонента недоступны данные из внешнего контекста. Непосредственный доступ он имеет только к локальным
          свойствам и методам, а так же к данным, полученным с параметрами вызова компонента (props)</p>
          <p>Однако среди прототипных свойств компонента есть свойства <spec_words>$root</spec_words> или <spec_words>$parent</spec_words>,
          являющиеся ссылками на корневой экземпляр Vue и родительский компонент, соответственно</p>
          <p>С помощью этих свойств можно получить доступ к контексту корневого экземпляра Vue и родительского компонента,
          но использовать такой вариант доступа нужно очень осторожно ( только для чтения данных )</p>
          <p>Прототипное свойство <spec_words>props</spec_words> компонента - это объект, играющий роль буфера при передаче данных компоненту от родителя</p>
        `
    },
    {
      header: "Глобальный компонент",
      content: `
        <p>Объект глобального компонента создается с помощью конструктора</p>
        <pre class = "snippet">
           Vue.component ( 'sample-component', {
                ...
           })
        </pre>
        <p>где 'sample-component' - имя плейсхолдера компонента, с помощью которого его можно будет вставить в шаблон разметки</p>
        <pre class = "snippet">
        &lt;'sample-component>&lt;/sample-component>
        </pre>
      `
    },
    {
      header: "Локальный компонент",
      content: `
        <p>Объект локального компонента объявляется в литеральной форме</p>
        <pre class = "snippet">
        const sampleComponent = ( 'sample-component', {
             ...
        })
        </pre>
        <p>Для локального компонента не обязательно указывать имя плейсхолдера 'sample-component',
поскольку это имя может быть задано при привязке его к родителю ( например, экземпляру Vue )</p>
        <pre class = "snippet">
        const sampleComponent = {
             ...
        }
        </pre>
      `
    },
    {
      header: "Регистрация локального компонента",
      content: `
          <p>Подключение локального компонента к родителю ( например, экземпляру Vue ) осуществляется
через свойство <spec_words>components</spec_words></p>
          <pre class = "snippet">
             const sampleApp = new Vue ({
                data: { ... },
                computed: { ... },
                ...,
                components: {
                    'sample-component': sampleComponent
                }
             })
          </pre>
          <p>Свойство <spec_words>components</spec_words> есть не только у экземпляра Vue, но и у каждого компонента</p>
          <p>Объявить локальный компонент можно непосредственно в <spec_words>components</spec_words></p>
          <pre class = "snippet">
             const sampleApp = new Vue ({
                data: { ... },
                computed: { ... },
                ...,
                components: {
                    'sample-component': sampleComponent,
                    'chil-component': {
                         ...
                    }
                }
             })
          </pre>
      `
    },
    {
      header: "Свойство data",
      content: `
          <p>Свойство <spec_words>data</spec_words> компонента должно быть функцией, возвращающей объект данных
При объявлении свойства <spec_words>data</spec_words> компонента нельзя использовать стрелочные функции</p>
          <pre class = "snippet">
             const sampleComponent = ( 'sample-component', {
                 template: "#sample-template",
                 data: function () {
                     return {
                         id: "user",
                         message: "Hello",
                     }
                 }
             })
          </pre>
          <p></p>
      `
    },
    {
      header: "Свойство template",
      content: `
          <p>Шаблон разметки компонента - это фрагмент html-кода, который при рендеринге компонента заменит его плейсхолдер</p>
          <pre class = "snippet">
             const sampleComponent = ( 'sample-component', {
                 props: [ "messages", "names"  ],
                 template: \`
                     &lt;section>
                        &lt;div class = 'title'
                             v-for = "( item, index ) in messages">
                                 {{ item }}
                                 &lt;span v-for = "name in names" >
                                     {{ name }}
                                 &lt;/span>
                        &lt;/div>
                     &lt;/section>
                 \`
             })
          </pre>
          <p>После рендеринга компонента плейсхолдер <sample-component></sample-component>
          будет заменен на содержимое <spec_words>template</spec_words></p>
          <p>! В темплейте компонента может быть только один корневой элемент</p>
          <p>Если используется директива <spec_words>v-for</spec_words>, после рендеринга в DOM будет уже не один элемент, а несколько,
  поэтому соответствующий элемент шаблона нужно "завернуть" в любой тег ( в нашем примере - &lt;section> &lt;/section> )</p>
          <a href = "https://plnkr.co/edit/xIfn2BrnMQSxFdPhvxDp?p=preview" target = "_blank">
              <img src = "../buttons/plunker.png" width = "30">
          </a>
          <p><small>В этом примере использован <spec_words>inline-template</spec_words></small></p>
      `
    },
    {
      header: "Свойство components",
      content: `
          <p>У компонентов тоже есть свойство <spec_words>components</spec_words></p>
          <p>С его помощью дочерние компоненты подключаются к родительским компонентам</p>
          <p>Дочерний компонент можно объявить непосредственно в теле родителя</p>
          <pre class="snippet">
             const ChildComponent = ( 'child-component', {
                 template: "&lt;h3>Child Component&lt;/h3>",
             })

             const parentComponent = ( 'parent-component', {
                 template: \`
                    &lt;div>
                        &lt;child-component>&lt;/child-component>
                        &lt;inner-component>&lt;/inner-component>
                    &lt;/div>
                 \`,
                 components: {
                     'child-component': ChildComponent,
                     'inner-component': ({
                           template: "&lt;h3>Inner Component&lt;/h3>"
                     })
                 }
             })

             new Vue ({
                 el:"#sampleApp",
                 components: {
                     'parent-component': parentComponent
                 }
             })
          </pre>
          <p>Разметка</p>
          <pre class="snippet">
             &lt;main id = "sampleApp">
                  &lt;parent-component>&lt;/parent-component>
             &lt;/main>
          </pre>
          <a href = "https://plnkr.co/edit/pljlTq8pP66s9vGwVnf5?p=preview" target = "_blank">
            <img src = "../buttons/plunker.png" width = "30">
          </a>
          <p><small>В этом примере использован <spec_words>x-template</spec_words></small></p>
      `
    },
    {
      header: "Свойство props",
      content: `
          <p>Через свойство <spec_words>props</spec_words> компонента ему можно передать данные ( аргументы )</p>
          <p>В теге компонента для привязки данных родителя к <spec_words>props</spec_words> компонента нужно использовать директиву <spec_words>v-bind</spec_words></p>
          <pre class="snippet">
              &lt;sample-component :props_var = "parent_var">&lt;/sample-component>
          </pre>
          <p>Следует учитывать, что массивы и объекты передаются не по значению, а по ссылке</p>
          <p>Поэтому любые изменения внутри компонента переданных через <spec_words>props</spec_words> массивов и объектов будут непосредственно отражаться на данных в корневом экземпляре</p>
          <p>Реактивная система Vue не сможет отслеживать эти изменения</p>
          <p>Во избежание этого рекомендуется все манипуляции производить с локальной копией массива или объекта,
и отсылать родителю результат через событие с помощью встроенного метода <spec_words>$emit</spec_words></p>
      `
    },
    {
      header: "Валидация props",
      content: `
          <p>Наиболее корректный способ описания входных параметров компонента - это установка типа данных, дефолтных значений и проверка входящих значений на соответствие требованиям</p>
          <p>В этом случае мы передаем не массив, а объект <spec_words>props</spec_words></p>
          <pre class="snippet">
             props: {
                 name: { ... },
                 age: { ... },
                 ...
             }
          </pre>
          <p>где каждое свойство само является объектом</p>
          <p>Структура объекта может включать следующие свойства</p>
          <ul style = "background-color: transparent!important; padding-left:50px; font-size:12px;">
             <li><spec_words>type</spec_words>      - тип данных</li>
             <li><spec_words>default</spec_words>   - значение по умолчанию ( если "забыли" передать этот параметр компоненту )</li>
             <li><spec_words>required</spec_words>  - если значение параметра должно быть обязательно передано компоненту</li>
             <li><spec_words>validator</spec_words> - функция, обрабатывающая ( анализирующая ) входящее значение параметра;<br>должна вернуть логическое значение</li>
          </ul>
          <p>Допустимые типы данных входных параметров</p>
          <ul style = "background-color: transparent!important; padding-left:50px; font-size:12px;">
             <li><spec_words>String</spec_words></li>
             <li><spec_words>Number</spec_words></li>
             <li><spec_words>Boolean</spec_words></li>
             <li><spec_words>Function</spec_words></li>
             <li><spec_words>Object</spec_words></li>
             <li><spec_words>Array</spec_words></li>
             <li><spec_words>Symbol</spec_words></li>
          </ul>
          <p>Если допустимых типов данных для параметра несколько, их можно передавать массивом:</p>
          <pre class="snippet">
             props: {
                 messages: {
                     type: [ Array, String ],
                     default: function () {
                         return [ "До свидания ", "Увидимся позже " ]
                     }
                 },
                 ...
             }
          </pre>
          <a href = "https://plnkr.co/edit/o7ZYonXKQw0GKRd0Ii2O?p=preview" target = "_blank">
            <img src = "../buttons/plunker.png" width = "30">
          </a>
          <p><small>При изучении примера откройте консоль браузера</small></p>
      `
    },
    {
      header: "Функция validator",
      content: `
          <p>Функция <spec_words>validator</spec_words> позволяет "перехватывать" и обрабатывать по-своему исключения, возникающие вследствие несоответствия типа данных переданного значения параметра</p>
          <p>С помощью функции-валидатора можно также контролировать переданные значения</p>
          <p>Аргументом функции-валидатора является полученное значение параметра</p>
          <pre class="snippet">
             props: {
                 names: {
                     type: Array,
                     validator: function ( val ) {
                         if ( Array.isArray ( val ) ) return true
                         else {
                              console.error ( "Некорректный тип данных параметра names: должен быть массив" )
                              return true
                         }
                     },
                     default: function () {
                        return [ "Олег ", "Катя " ]
                     }
                 }
             }
          </pre>
          <p>Следует учитывать, что массивы и объекты передаются не по значению, а по ссылке</p>
          <p>Поэтому любые изменения внутри компонента переданных через <spec_words>props</spec_words> массивов и объектов будут непосредственно отражаться на данных в корневом экземпляре</p>
          <p>Реактивная система Vue не сможет отслеживать эти изменения</p>
          <p>Во избежание этого рекомендуется все манипуляции производить с локальной копией массива или объекта,
и отсылать родителю результат через событие с помощью встроенного метода <spec_words>$emit</spec_words></p>
      `
    },
    {
      header: "Передача данных из компонента",
      content: `
          <p>Компонент не должен напрямую изменять данные родителя, поскольку реактивная система Vue не будет отслеживать эти изменения</p>
          <p>Встроенный метод <spec_words>$emit</spec_words> позволяет эмитировать события из компонентов с передачей объекта аргументов</p>
          <pre class="snippet">
             this.$root.$emit ( 'id-changed', id )
          </pre>
          <p>а в других компонентах "ловить" это событие с помощью свойства <spec_words>$on</spec_words> и принимать переданные с ним данные</p>
          <pre class="snippet">
             this.$root.$on ( 'id-changed', function ( id ) {
                  ...
             })
          </pre>
          <p>Для изучения событийной модели смотрите раздел <var_names>Events</var_names></p>
      `
    }
]

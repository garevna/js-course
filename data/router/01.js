var items = [
    {
      header: "1. Подключить библиотеку",
      content: `
        <p>
          https://unpkg.com/vue-router/dist/vue-router.js
        </p>
      `
    },
    {
      header: "2. Создать массив маршрутов перехода",
      content: `
        <p>Маршрут - это объект</p>
        <pre class = "snippet">
          {
              path: "/articles",
              component: ArticleStore
          }
        </pre>
        <p><small>('/' означает маршрут приложения по умолчанию)</small></p>
        <p>Из таких объектов составляется массив</p>
        <pre class = "snippet">
          routes: [
            {
                path: '/library',
                component: Library
            },
            {
                path: '/articles',
                component: ArticleStore
            },
            ...
          ]
        </pre>
      `
    },
    {
      header: "3. Создать экземпляр роутера",
      content: `
          <p>Используем конструктор <spec_words>VueRouter</spec_words></p>
          <pre class = "snippet">
            const router = new VueRouter ( {
                routes: routes
            })
          </pre>
          <p>Роутеру передается массив маршрутов <spec_words>routes</spec_words>
          </p>
      `
    },
    {
      header: "4. Привязка роутера к экземпляру Vue",
      content: `
          <p>Объект <spec_words>router</spec_words> нужно привязать к экземпляру
          <spec_words>Vue</spec_words>:</p>
          <pre class = "snippet">
            new Vue ({
                el: '#app',
                router,
                ...,
                components: { ... }
            })
          </pre>
      `
    },
    {
      header: "5. Создать компоненты",
      content: `
          <p>Не забудьте создать компоненты, обслуживающие маршруты переходов</p>
          <pre class = "snippet">
            const Library = {
                template: \`
                  &lt;div>
                      &lt;h2>Library&lt;/h2>
                  &lt;/div>
                \`,
                ...
            }
          </pre>
          <p>Модель готова</p>
      `
    },
    {
      header: "6. Разметка",
      content: `
          <p>Теперь осталось только связать всю эту машинку с <spec_words>UI</spec_words>
          </p>
          <p>Для этого в разметке вставляем теги:</p>
          <h4>гиперссылка перехода</h4>
          <pre class="snippet">
              &lt;router-link to = "/library">&lt;/router-link>
          </pre>
          <p>где <spec_words>to</spec_words> - обязательный атрибут, указывающий маршрут перехода <small><br>(после рендеринга этот тег будет заменен на обычную
          гиперссылку)</small></p>
          <h4>плейсхолдер для компонента</h4>
          <pre class="snippet">
              &lt;router-view>&lt;/router-view>
          </pre>
          <p>
            Итак, при клике на гиперссылке <spec_words>router-link</spec_words> роутер монтирует нужный компонент в месте размещения плейсхолдера
            <spec_words>router-view</spec_words>
          </p>
      `
    },
    {
      header: "7. Дочерние маршруты",
      content: `
          <p>Маршруты могут быть вложенными:</p>
          <pre class="snippet">
              routes: [
                {
                    path: '/',
                    component: Home
                },
                {
                    path: '/parent_route',
                    component: ParentComponent,
                    children: [
                      {
                          path: 'child',
                          component: ChildComponent
                      }
                    ]
                }
              ]
          </pre>
          <p>В таком случае в разметке ( темплейте ) компонента <var_names>ParentComponent</var_names> должны быть <spec_words>router-link</spec_words> с атрибутом <spec_words>to</spec_words> = "<var_names>child</var_names>" и <spec_words>router-view</spec_words> для отображения компонента <var_names>ChildComponent</var_names></p>

      `
    }
]

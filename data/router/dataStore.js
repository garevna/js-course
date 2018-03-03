console.log ('routerSampleStore')
const routerSampleStore = new Vuex.Store({
  // strict: true,
  state: {
    items: [
    `
      Обратите внимание на плейсхолдер для компонента, 
  который будет смонтирован для отображения контента при 
  переходе на маршрут роутера:<br/>
  <pre class="code-snippet">
  &lt;router-view class="router-view"
             company="A-level"
             group="Front End advanced">
  &lt;/router-view>
  </pre><br/>

  В плейсхолдере есть два атрибута: company и group<br/>
  Внутри компонента эти атрибуты будут доступны как 
  свойства объекта $attrs:<br/>
  <pre class="code-snippet">
  $attrs.company
  $attrs.group
  </pre><br/>
  Т.е. при вызове компонента мы можем передавать ему параметры 
  не только через props, но и через атрибуты тега<br/>

  Внутри компонента мы выводим значения переданных таким образом 
  параметров:<br/>
  <pre class="code-snippet">
  &lt;div class="red">{{ $attrs.company }}&lt;/div>
  &lt;div class="red">{{ $attrs.group }}&lt;/div>
  </pre><br/>
    `,
    `
      В компоненте входные параметры определены так:<br/>
  <pre class="code-snippet">
  props: {
    name: {
      type: String,
      default: 'параметры роутера'
    }
  }
  </pre><br/>
  т.е. компонент ожидает на входе символьную строку name, и если не 
  получает, то устанавливает значение свойства name по умолчанию 
  'параметры роутера'<br/>
    `,
    `
      Первый маршрут не имеет переменной части и передается без параметров<br/>
  <pre class="code-snippet">
  {
    path: '/',
    component: TestParams
  }
  </pre><br/>
  и соответствующий переход выглядит так:<br/>
  <pre class="code-snippet">
  &lt;router-link class="router-link" to="/">/
  &lt;/router-link>
  </pre><br/>
<b>3.2.</b> Второй маршрут имеет переменную часть :name, фактическое значение 
которой при переходе по маршруту по умолчанию будет передаваемым 
параметром (props) для компонента, если свойство props в описании 
маршрута установлено в true<br/>
<pre class="code-snippet">
{
    path: '/Component/:name',
    component: TestParams, 
    props: true
}
</pre><br/>
Переход на этот маршрут определяет динамическую часть маршрута 
как строку "компонент", что и будет значением свойства name 
внутри компонента:<br/>
<pre class="code-snippet">
&lt;router-link
      class="router-link"
      to="/Component/компонент">
    /Component/компонент
&lt;/router-link>
</pre><br/>
<b>3.3.</b> Третий маршрут передает компоненту через props статически 
определенное значение входного параметра name<br/> 
<pre class="code-snippet">
{
    path: '/static',
    component: TestParams,
    props: { name: 'статические значения параметров' }
}
</pre><br/>
Переход на этот маршрут не передает никаких входных параметров 
компоненту:<br/>
<pre class="code-snippet">
&lt;router-link 
      class="router-link"
      to="/static">
  /static
&lt;/router-link>
</pre><br/>
Внутри компонента будет использовано статически определенное 
в самом маршруте значение свойства name<br/>

<b>3.4.</b> Четвертый маршрут имеет переменную часть :random<br/>
<pre class="code-snippet">
{
    path: '/dynamic/:random',
    component: TestParams,
    props: route => {
      return {
        name: 'динамические значения параметров ' + 
                    Math.round ( Math.random () * 
                    route.params.random
        )
      }
    }
}
</pre><br/>
Обратите внимание, что в самом маршруте свойство name объекта props 
определяется динамически, исходя из значения динамической части 
маршрута random<br/>
Маршрут (route) представляет собой объект, у которого есть свойство 
params, в котором и будет находиться переменная часть маршрута<br/>

Переход на этот маршрут передает компоненту фактическое значение 
переменной части маршрута:<br/>
<pre class="code-snippet">
&lt;router-link
      class="router-link"
      to="/dynamic/100000">
  /dynamic/100000
&lt;/router-link>
</pre><br/>
Если вывести в консоль четвертый маршрут, то можно увидеть такую 
структуру объекта route:<br/>
<pre class="code-snippet">
{
  fullPath: "/dynamic/100000"
  hash:""
  matched:[{…}]
  meta:{}
  name:undefined
  params: { random: "100000" }
  path:"/dynamic/100000"
  query:{}
  __proto__:Object
}
</pre><br/>
Таким образом, в описании маршрута на props повешена функция, которая 
в качестве входного параметра принимает объект маршрута route, а 
возвращает props со значением name, вычисленным с использованием 
фактического значения переменной части маршрута route.params.random<br/>

<b>3.5.</b> Пятый маршрут с виду простой, он не имеет динамической части и 
статически устанавливает значение name в 'attr'<br/>
<pre class="code-snippet">
{
    path: '/attrs',
    component: TestParams,
    props: () => {
      return { name: 'attr' }
    }
}
</pre><br/>
Здесь, в противоположность предыдущему, вся логика вынесена в компонент<br/>
<pre class="code-snippet">
&lt;router-link
      class="router-link"
      to="/attrs">
  /attrs
&lt;/router-link>
</pre><br/>
Посмотрим теперь, что делает компонент с этим атрибутом:<br/>
<pre class="code-snippet">
{{ this.name === 'attr' ? 
      this.$attrs.company : 
      this.name 
}}
</pre><br/>
Т.е. если компонент получает name === 'attr', он берет значение name из 
своих атрибутов $attrs (в данном случае - атрибута company), во всех 
остальных случаях (т.е. на всех выше описанных маршрутах) он оставляет 
значение name таким, как есть<br/>
    `
    ]
  },
  mutations: {
    updateData: function ( state, { index, value } ) {
      Object.assign ( state.items, {
        [ index ]: value
      })
    }
  }
})

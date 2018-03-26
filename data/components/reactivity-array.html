<p>Поскольку массивы и объекты передаются по ссылке, изменение значений элементов массива или свойств объекта не реактивны</p>
<p>Посмотрим, как можно обеспечить реактивность массива, т.е. отслеживать изменение каждого его элемента</p>
<p>Предположим, в свойстве <spec_words>data</spec_words> экземпляра <spec_words>Vue</spec_words> объявлен массив
<var_names>flowers</var_names></p>

<pre class="code-snippet">
new Vue ({
    el: '#sample',
    data: {
        flowers: [
            'ромашка',
            'пион',
            'фикус',
            'хризантема'
        ]
    }
})
</pre>
<p>Задача - обеспечить реактивность массива <var_names>flowers</var_names> при вводе ( изменении ) значений его элементов</p>
<p>Элементы <spec_words>input</spec_words> связаны с моделью директивой <spec_words>v-model</spec_words></p>
<p>Для вывода элементов массива используется директива <spec_words>v-for</spec_words></p>
<p>В следующем фрагменте кода массив не будет реактивным</p>

<pre class="code-snippet">
&lt;ul>
    &lt;li v-for = "flower in flowers">
        &lt;input v-model = "flower" />
    &lt;/li>
&lt;/ul>
</pre>
<p>А вот такой вариант обеспечивает реактивность массива <var_names>flowers</var_names></p>
<pre class="code-snippet">
&lt;ul>
    &lt;li v-for = "( flower, index ) in flowers">
        &lt;input v-model = "flowers [ index ]" />
    &lt;/li>
&lt;/ul>
</pre>

<p>Для отслеживания изменений массива можно использовать свойство <spec_words>watch</spec_words> экземпляра
<spec_words>Vue</spec_words></p>
<pre class="code-snippet">
watch: {
    'flowers': function ( newVal, oldVal ) {
        console.info ( 'Массив flowers был изменен' )
    }
}
</pre>
<p>При отслеживании изменений массива с помощью <spec_words>watch</spec_words>
можно использовать <spec_words>handler</spec_words></p>
<pre class="code-snippet">
watch: {
    'flowers': {
        handler: function ( newVal, oldVal ) {
            console.info ( 'Массив flowers был изменен' )
        }
    }
}
</pre>
<p>Свойство <spec_words>handler</spec_words> - обработчик события изменения указанного реактивного свойства</p>

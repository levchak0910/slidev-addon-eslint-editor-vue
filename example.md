```yaml
layout: center
class: text-center
```

# Eslint Vue editor Demo

<br>

<Link to="2">Slide 2: code usage</Link>

<br>

<Link to="3">Slide 3: snippet usage</Link>

---

<ESLintVueEditor :rules="{ 'vue/no-restricted-class': ['error', 'forbidden'] }">

```vue
<template>
  <div class="forbidden">Hello</div>
</template>
```

</ESLintVueEditor>

---

<ESLintVueEditor :rules="{ 
  'vue/no-restricted-class': ['error', 'forbidden'],
  'vue-scoped-css/enforce-style-type': 'error',
  'vue-scoped-css/no-unused-selector': 'error',
  'vue-kebab-class-naming/no-convention-violation': ['error', { enableFix: true }],
  'vue-kebab-class-naming/no-dynamic-class-names': 'error',
  'vue-kebab-class-naming/no-undefined-class-names': 'error',
}">

<<< @/snippets/code.vue

</ESLintVueEditor>

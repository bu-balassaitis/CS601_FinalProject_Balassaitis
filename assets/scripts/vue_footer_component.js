Vue.component ('SiteFooter', {
    template: `
    <span>
            <!-- Collapsible section with contact info -->
            <details>
                <summary>&copy;{{ this.$root.dt.getFullYear() }} {{ this.$root.author }}</summary>
                <address>
                    <p>
                        Contact site admin by phone at {{ this.$root.phone }} or <a :href="this.$root.email">email</a>
                    </p>
                </address>
            </details>
            <a id="top" onclick="window.scrollTo(0, 0);">Return to top of page</a>
    </span>
    `
})


const vueApp = new Vue({
    el:'#vueFooter',
    data: {
        dt: new Date(),
        author: 'Brad Balassaitis',
        phone: '867-5309',
        email: 'mailto:bradbala@bu.edu'
    }
})
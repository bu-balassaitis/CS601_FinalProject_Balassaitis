Vue.component ('SiteHeader', {
    template: `
    <span>
        <h3>
            {{ this.$root.pageTitle }}
        </h3>


        <!-- Page navigation links -- main menu on larger screens -->
        <nav id="main-menu">
            <ul>
                <li v-for="lnk in this.$root.navLinks " :id=lnk.linkId>
                    <a :href=lnk.link>{{ lnk.linkTextShort || lnk.linkText }}</a>
                </li>
            </ul>
        </nav>


        <!-- Hidden checkbox to toggle the hamburger menu -->
        <input type="checkbox" id="hamburger-input" class="burger-shower" />

        <!-- Page navigtion links -- responsive hamburger menu -->
        <label id="hamburger-menu" for="hamburger-input">
            <nav id="sidebar-menu">
                <h3>Pages</h3>
                <ul>
                    <li v-for="lnk in this.$root.navLinks ">
                        <a :href=lnk.link>{{ lnk.linkText }}</a>
                    </li>
                </ul>
            </nav>
        </label>

        <!-- Overlay to show a dark background behind the menu on smaller screens -->
        <div class="overlay"></div>
    </span>
    `
})


const vueApp = new Vue({
    el:'#vueHeader',
    data: {
        pageTitle: "It's A Big, Brad World",
        navLinks: [
            {link: 'index.html', linkText:'About'},
            {link: 'family.html', linkText:'Family'},
            {link: 'locations.html', linkText:'Locations'},
            {link: 'education.html', linkText:'Education'},
            {link: 'career.html', linkText:'Career'},
            {link: 'fandom.html', linkText:'Fandom'},
            {link: 'players.html', linkText:'Favorite Players', linkTextShort:'Players'},
            {link: 'martialarts.html', linkText:'Martial Arts', linkId:'ma'},
            {link: 'chuck-norris-joke.html', linkText:'Chuck Norris Joke', linkTextShort:'Joke'},
            {link: 'stock-prices.html', linkText:'Stock Prices', linkTextShort:'Stock'}
        ]
    }
})
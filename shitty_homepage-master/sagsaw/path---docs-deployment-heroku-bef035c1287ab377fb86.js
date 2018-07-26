webpackJsonp([0xdb3cfc3ac9b6],{470:function(e,t){e.exports={data:{post:{html:'<h1 id="deploying-an-api-platform-app-on-heroku"><a href="#deploying-an-api-platform-app-on-heroku" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Deploying an API Platform App on Heroku</h1>\n<p><a href="http://heroku.com" target="_blank" rel="nofollow noopener noreferrer">Heroku</a> is a popular, fast, scalable and reliable <em>Platform As A Service</em> (PaaS). As Heroku offers a\nfree plan including database support through <a href="https://www.heroku.com/postgres" target="_blank" rel="nofollow noopener noreferrer">Heroku Postgres</a>, it\'s\na convenient way to experiment with the API Platform.</p>\n<p>The API Platform Heroku integration also supports MySQL databases provided by <a href="https://addons.heroku.com/cleardb" target="_blank" rel="nofollow noopener noreferrer">the ClearDB add-on</a>.</p>\n<p>Deploying API Platform applications on Heroku is straightforward and you will learn how to do it in this tutorial.</p>\n<p><em>Note: this tutorial works perfectly well with API Platform but also with any Symfony application based on the Symfony Standard\nEdition.</em></p>\n<p>If you don\'t already have one, <a href="https://signup.heroku.com/signup/dc" target="_blank" rel="nofollow noopener noreferrer">create an account on Heroku</a>. Then install <a href="https://devcenter.heroku.com/articles/getting-started-with-php#local-workstation-setup" target="_blank" rel="nofollow noopener noreferrer">the Heroku\ntoolbelt</a>. We guess you already\nhave a working install of <a href="http://getcomposer.org" target="_blank" rel="nofollow noopener noreferrer">Composer</a>, perfect, we will need it.</p>\n<p>Create a new API Platform project as usual:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">composer create-project api-platform/api-platform</code></pre>\n      </div>\n<p>Heroku relies on <a href="https://devcenter.heroku.com/articles/config-vars" target="_blank" rel="nofollow noopener noreferrer">environment variables</a> for its configuration. Regardless\nof what provider you choose for hosting your application, using environment variables to configure your production environment\nis a best practice supported out of the box by API Platform.</p>\n<p>Create a Heroku\'s <code>app.json</code> file at the root of the <code>api/</code> directory to configure the deployment:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  <span class="token property">"success_url"</span><span class="token operator">:</span> <span class="token string">"/"</span><span class="token punctuation">,</span>\n  <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"APP_ENV"</span><span class="token operator">:</span> <span class="token string">"prod"</span><span class="token punctuation">,</span>\n    <span class="token property">"APP_SECRET"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">"generator"</span><span class="token operator">:</span> <span class="token string">"secret"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">"CORS_ALLOW_ORIGIN"</span><span class="token operator">:</span> <span class="token string">"https://your-client-url.com"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">"addons"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token string">"heroku-postgresql"</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token property">"buildpacks"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"https://github.com/heroku/heroku-buildpack-php"</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"postdeploy"</span><span class="token operator">:</span> <span class="token string">"php bin/console doctrine:schema:create"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>The file also tells the Heroku deployment system to build a PHP container and to add the Postgres add-on.</p>\n<p>We are almost done, but API Platform (and Symfony) has a particular directory structure which requires further configuration.\nWe must tell Heroku that the document root is <code>public/</code>, and that all other directories must be private.</p>\n<p>Create a new file named <code>Procfile</code> in the <code>api/</code> directory with the following content:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">web</span><span class="token punctuation">:</span> vendor/bin/heroku<span class="token punctuation">-</span>php<span class="token punctuation">-</span>apache2 public/\n</code></pre>\n      </div>\n<p>As Heroku doesn\'t support Varnish out of the box, let\'s remove it\'s integration:</p>\n<div class="gatsby-highlight">\n      <pre class="language-patch"><code class="language-patch"># api/config/packages/api_platform.yaml\n-    http_cache:\n-        invalidation:\n-            enabled: true\n-            varnish_urls: [\'%env(VARNISH_URL)%\']\n-        max_age: 0\n-        shared_max_age: 3600\n-        vary: [\'Content-Type\', \'Authorization\']\n-        public: true</code></pre>\n      </div>\n<p>Heroku provides another free service, <a href="https://devcenter.heroku.com/articles/logplex" target="_blank" rel="nofollow noopener noreferrer">Logplex</a>, which allows us to centralize\nand persist applications logs. Because API Platform writes logs on <code>STDERR</code>, it will work seamlessly.</p>\n<p>However, if you use Monolog instead of the default logger, you\'ll need to configure it to output to <code>STDERR</code> instead of\nin a file.</p>\n<p>Open <code>api/config/packages/prod/monolog.yaml</code> and apply the following patch:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">monolog</span><span class="token punctuation">:</span>\n    <span class="token comment"># ...</span>\n    <span class="token key atrule">handlers</span><span class="token punctuation">:</span>\n        <span class="token key atrule">nested</span><span class="token punctuation">:</span>\n            <span class="token key atrule">type</span><span class="token punctuation">:</span> stream\n            <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"%kernel.logs_dir%/%kernel.environment%.log"</span>\n            <span class="token key atrule">level</span><span class="token punctuation">:</span> debug\n+       nested<span class="token punctuation">:</span>\n+           type<span class="token punctuation">:</span> stream\n+           path<span class="token punctuation">:</span> <span class="token string">\'php://stderr\'</span>\n+           level<span class="token punctuation">:</span> debug\n</code></pre>\n      </div>\n<p>We are now ready to deploy our app!</p>\n<p>Go to the <code>api/</code> directory, then</p>\n<ol>\n<li>\n<p>Initialize a git repository:</p>\n<p>git init</p>\n</li>\n<li>\n<p>Add all existing files:</p>\n<p>git add --all</p>\n</li>\n<li>\n<p>Commit:</p>\n<p>git commit -a -m "My first API Platform app running on Heroku!"</p>\n</li>\n<li>\n<p>Create the Heroku application:</p>\n<p>heroku create</p>\n</li>\n<li>\n<p>And deploy for the first time:</p>\n<p>git push heroku master</p>\n</li>\n</ol>\n<p><strong>We\'re done.</strong> You can play with the demo bookstore API provided with API Platform. It is ready for production and you\ncan scale it in one click from the Heroku interface.</p>\n<p>To see your logs, run <code>heroku logs --tail</code>.</p>'},navDoc:{edges:[{node:{title:"The Distribution",path:"distribution",items:[{id:"index",title:"Creating a Fully Featured API in 5 Minutes",anchors:null},{id:"testing",title:"Testing and Specifying the API",anchors:null}]}},{node:{title:"The API Component",path:"core",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:[{id:"installing-api-platform-core",title:"Installing API Platform Core"},{id:"before-reading-this-documentation",title:"Before Reading this Documentation"},{id:"mapping-the-entities",title:"Mapping the Entities"}]},{id:"configuration",title:"Configuration",anchors:null},{id:"operations",title:"Operations",anchors:[{id:"enabling-and-disabling-operations",title:"Enabling and Disabling Operations"},{id:"configuring-operations",title:"Configuring Operations"},{id:"subresources",title:"Subresources"},{id:"creating-custom-operations-and-controllers",title:"Creating Custom Operations and Controllers"}]},{id:"default-order",title:"Overriding Default Order",anchors:null},{id:"filters",title:"Filters",anchors:[{id:"doctrine-orm-filters",title:"Doctrine ORM Filters"},{id:"serializer-filters",title:"Serializer Filters"},{id:"creating-custom-filters",title:"Creating Custom Filters"},{id:"apifilter-annotation",title:"ApiFilter Annotation"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"the-serialization-context-groups-and-relations",title:"The Serialization Context, Groups and Relations"},{id:"using-serialization-groups",title:"Using Serialization Groups"},{id:"using-different-serialization-groups-per-operation",title:"Using Different Serialization Groups per Operation"},{id:"changing-the-serialization-context-dynamically",title:"Changing the Serialization Context Dynamically"},{id:"changing-the-serialization-context-on-a-per-item-basis",title:"Changing the Serialization Context on a Per Item Basis"},{id:"name-conversion",title:"Name Conversion"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"},{id:"entity-identifier-case",title:"Entity Identifier Case"},{id:"embedding-the-json-ld-context",title:"Embedding the JSON-LD Context"}]},{id:"validation",title:"Validation",anchors:[{id:"using-validation-groups",title:"Using Validation Groups"},{id:"dynamic-validation-groups",title:"Dynamic Validation Groups"},{id:"error-levels-and-payload-serialization",title:"Error Levels and Payload Serialization"}]},{id:"errors",title:"Error Handling",anchors:[{id:"converting-php-exceptions-to-http-errors",title:"Converting PHP Exceptions to HTTP Errors"}]},{id:"pagination",title:"Pagination",anchors:[{id:"disabling-the-pagination",title:"Disabling the Pagination"},{id:"changing-the-number-of-items-per-page",title:"Changing the Number of Items per Page"},{id:"partial-pagination",title:"Partial Pagination"}]},{id:"events",title:"The Event System",anchors:null},{id:"content-negotiation",title:"Content Negotiation",anchors:[{id:"enabling-several-formats",title:"Enabling Several Formats"},{id:"registering-a-custom-serializer",title:"Registering a Custom Serializer"},{id:"creating-a-responder",title:"Creating a Responder"},{id:"writing-a-custom-normalizer",title:"Writing a Custom Normalizer"}]},{id:"external-vocabularies",title:"Using External JSON-LD Vocabularies",anchors:null},{id:"extending-jsonld-context",title:"Extending JSON-LD context",anchors:null},{id:"data-providers",title:"Data Providers",anchors:[{id:"custom-collection-data-provider",title:"Custom Collection Data Provider"},{id:"custom-item-data-provider",title:"Custom Item Data Provider"},{id:"injecting-the-serializer-in-an-itemdataprovider",title:'Injecting the Serializer in an "ItemDataProvider"'}]},{id:"extensions",title:"Extensions",anchors:[{id:"custom-extension",title:"Custom Extension"},{id:"example",title:"Filter upon the current user"}]},{id:"security",title:"Security",anchors:null},{id:"performance",title:"Performance",anchors:[{id:"enabling-the-builtin-http-cache-invalidation-system",title:"Enabling the Builtin HTTP Cache Invalidation System"},{id:"enabling-the-metadata-cache",title:"Enabling the Metadata Cache"},{id:"using-ppm-php-pm",title:"Using PPM (PHP-PM)"},{id:"doctrine-queries-and-indexes",title:"Doctrine Queries and Indexes"}]},{id:"operation-path-naming",title:"Operation Path Naming",anchors:[{id:"configuration",title:"Configuration"},{id:"create-a-custom-operation-path-resolver",title:"Create a Custom Operation Path Naming"}]},{id:"form-data",title:"Accept application/x-www-form-urlencoded Form Data",anchors:null},{id:"fosuser-bundle",title:"FOSUserBundle Integration",anchors:[{id:"installing-the-bundle",title:"Installing the Bundle"},{id:"enabling-the-bridge",title:"Enabling the Bridge"},{id:"creating-a-user-entity-with-serialization-groups",title:'Creating a "User" Entity with Serialization Groups'}]},{id:"jwt",title:"Adding a JWT authentication using LexikJWTAuthenticationBundle",anchors:[{id:"testing-with-swagger",title:"Testing with Swagger"},{id:"testing-with-behat",title:"Testing with Behat"}]},{id:"nelmio-api-doc",title:"NelmioApiDocBundle integration",anchors:null},{id:"angularjs-integration",title:"AngularJS Integration",anchors:[{id:"restangular",title:"Restangular"},{id:"ng-admin",title:"ng-admin"}]},{id:"swagger",title:"Swagger Support",anchors:[{id:"override-swagger-documentation",title:"Override Swagger documentation"}]},{id:"graphql",title:"GraphQL Support",anchors:[{id:"overall-view",title:"Overall View"},{id:"enabling-graphql",title:"Enabling GraphQL"},{id:"graphiql",title:"GraphiQL"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"}]},{id:"dto",title:"Handling Data Transfer Objects (DTOs)",anchors:null}]}},{node:{title:"The Schema Generator Component",path:"schema-generator",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:null},{id:"configuration",title:"Configuration",anchors:null}]}},{node:{title:"The Admin Component",path:"admin",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation",title:"Installation"},{id:"creating-the-admin",title:"Creating the Admin"},{id:"customizing-the-admin",title:"Customizing the Admin"}]},{id:"authentication-support",title:"Authentication Support",anchors:null},{id:"handling-relations-to-collections",title:"Handling Relations to Collections",anchors:[{id:"using-an-autocomplete-input-for-relations",title:"Using an Autocomplete Input for Relations"}]}]}},{node:{title:"The Client Generator Component",path:"client-generator",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"react",title:"React generator",anchors:null},{id:"vuejs",title:"Vue.js generator",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null}]}},{node:{title:"Deployment",path:"deployment",items:[{id:"index",title:"Introduction",anchors:null},{id:"kubernetes",title:"Deploying to a Kubernetes Cluster",anchors:null},{id:"heroku",title:"Deploying an API Platform App on Heroku",anchors:null}]}},{node:{title:"Extra",path:"extra",items:[{id:"releases",title:"The Release Process",anchors:null},{id:"philosophy",title:"The Project's Philosophy",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null},{id:"contribution-guides",title:"Contribution Guides",anchors:null},{id:"conduct",title:"Contributor Code Of Conduct",anchors:null}]}}]}},pathContext:{path:"docs/deployment/heroku",current:{path:"docs/deployment/heroku",title:"Deployment - Deploying an API Platform App on Heroku"},prev:{path:"docs/deployment/kubernetes",title:"Deploying to a Kubernetes Cluster",rootPath:"Deployment"},next:{path:"docs/extra/releases",title:"Extra - The Release Process"}}}}});
//# sourceMappingURL=path---docs-deployment-heroku-bef035c1287ab377fb86.js.map
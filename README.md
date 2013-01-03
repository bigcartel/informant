# Informant

Have you ever been filling out a form in one of those fancy-pants "Web 2.0" apps, when you stumble upon a link to something else, perhaps a help article, and when you click it you lose all the info you just filled out? The Informant has, and frankly he's got no stomach for it.

The Informant now lives to prevent others from a similar fate. He watches your forms carefully, and if someone tries to leave the page with unsaved changes… well… let's just say they'll hear about it.

### How can I get The Informant on my side?

The Informant gets most of his strength from Arby Melts and jQuery 1.7+, so be sure to grab those. After that, just include these JavaScript vigilantes and let them handle the rest:

```javascript
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.informant.js" type="text/javascript"></script>
<script type="text/javascript" charset="utf-8">
  $(function() { $('form').informant(); });
</script>
```

Or if you've got something special to say...

```javascript
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.informant.js" type="text/javascript"></script>
<script type="text/javascript" charset="utf-8">
  $(function() { $('form').informant({ message: 'You are going to lose all your hard work!' }); });
</script>
```

That's it. The streets of your app are now a little safer.

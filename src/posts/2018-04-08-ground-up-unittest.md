---
title: "Selenium From The Ground Up: XPath Locators"
date: "2018-04-08"
---

In the last article of [Selenium From The Ground Up: Setting Up Selenium](http://simple-selenium.com/2018-04-05-ground-up-setup/) we installed PyCharm, selenium, and the ChromeDriver. Then we wrote our first "Hello World" program to verify the webdriver is working properly. If you have not read that article, go back and do so before going on.

In this article I will be introducing locators, more specifically the **XPath locator** and how to search for elements on a webpage using XPath locators. I will also introduce my methods of selecting proper locators, and some useful properties that you can use to locate hard to grab elements.

# What This All Means, GET ON WITH IT
We will use the XPath selector to do the work of verifying the content and clicking on specific elements to navigate us to other pages.

For the sake of simplicity, we're going to write a program verify that

__The first post name on simpleselenium.com matches the name when you click on the post__

So let's use pseudo code and write the test outline to verify this.

In our existing blog-testing PyCharm project modify blog_test.py to match the following code-snippet.

```python
# blog_test.py

from selenium import webdriver

# driver = webdriver.Chrome()
# driver.get('https://www.google.com')
# driver.close()

# 1. create webdriver

# 2. navigate to http://simpleselenium.com

# 3. Get the name of the first post

# 4. click on the first post

# 5. verify that the post title matches the name saved from step 3

# 6. close webdriver
```

Using the code we developed in the last article, we can satisfy stepa 1, 2, and 6. Let's see what our program looks like when we've created the webdriver instance and navigated to simpleselenium.com, and closed the driver when we're done with the program.. 

```python
# blog_test.py

from selenium import webdriver

# 1. create webdriver
driver = webdriver.Chrome()

# 2. navigate to http://simpleselenium.com
driver.get('http://www.simpleselenium.com')

# 3. Get the name of the first post

# 4. click on the first post

# 5. verify that the post title matches the name saved from step 3

# 6. close webdriver
driver.close()
```

Now it's time to implement step 3. So we see **"Get the name of the first post"**. How we do this is actually quite simple. 

1. First visit the website http://simpleselenium.com
2. Open Chromes debugging tools, View > Developer > Developer Tools 
3. Ctrl-click on the first posts name, click select

Then you see something like the html following selected
```html
<h3 class="css-glamorous-h3-di0m6n">
  Selenium From The Ground Up: XPath Locators
</h3>
```

So looking at this, we could say, *let's select all h3 elements on the page, and these must be the names of the posts*, however this is bad, and I advise against it. What if the there are other things on the page that use a h3 tag that are not posts, this would break instantly. **So there must be a better way.**

let's take another look at the html from a higher-view-point in the dom tree
```bash
<div>
  <h1 class="css-glamorous-h1-v7lm6e">Posts</h1>
  <div data="post">
    <a class="css-cf64o3" href="/2018-04-08-ground-up-unittest/">
      <h3 class="css-glamorous-h3-di0m6n">Selenium From The Ground Up: XPath Locators</h3>
      <span class="css-glamorous-span-1do0l04">08 April, 2018</span>
    ...
```

We see something interesting here, `<div data="post">`, it looks like we can use this identifier to locate our posts, let's try it out using the XPath locater and see if our theory is right. In the developer tools window click [command+f] to open up the search box.

Then type `//div[@data="post"]` which finds 1 of 2 matches. This statement is called an XPath locator. I'll dissect this statement now.

* `//div` - search in the dom for all div elements
* `div[@data="posts"]` - search for all divs that have the attribute 'data' and value of 'posts'

Essentially this is all there is to XPath locators, using **//** to look everywhere in the dom in combination of html tags, and then the **[..]** searches for specific attribute matches.

### Time to re-focus on what we were doing. We we're trying to get the name of the first post.
<br>

With our identifier we can get all the html blocks for all the posts, however, we don't care about all posts. We just want the first post name. So from the developer tools do a find for `(//div[@data="post"]//h3)[1]`. I've added parenthesis which means, get all h3 tags under the div with the attribute data="post", then get the first element that matches the XPath.

**So we now have the right XPath locator to get the post name**

Let's write the selenium python code to get us the name of the post.

```python
# blog_test.py

from selenium import webdriver

# 1. create webdriver
driver = webdriver.Chrome()

# 2. navigate to http://simpleselenium.com
driver.get('http://www.simpleselenium.com')

# 3. Get the name of the first post
first_post = driver.find_element_by_xpath('(//div[@data="post"]//h3)[1]')
print first_post.text

# 4. click on the first post

# 5. verify that the post title matches the name saved from step 3

# 6. close webdriver
driver.close()
```

Running the program we see the text printed in console **"Selenium From The Ground Up: XPath Locators"** or whatever the latest post name is (I'm sure I have many, many more posts by now).

A couple of key points:
* **find__element_by_xpath** - is the selenium function we use to search for the specific elenment
* **first_post.text** is an attribute of the WebDriverElement(selenium) that we can call to get the text defined in the html ..h3 element

More info at [locating-elements](http://selenium-python.readthedocs.io/locating-elements.html)

**Step 4 is a freebee with the code we just wrote**

```python
# blog_test.py

# 3. Get the name of the first post
first_post = driver.find_element_by_xpath('(//div[@data="post"]//h3)[1]')
print first_post.text

# 4. click on the first post
first_post.click()
```
Again. We run the test, and see that after printing the name of the post, the page navigates to the post page. SUCCESS! One more step to go,

# Verifying The Post Title
Like in the previous step we need to get the post title from the current page and then assert that the name matches the one from the posts page.

So we open up our developer tools and [control-right click] on the post name and look not just at the specific dom element, but the surround html as well.

```html
<div class="css-glamourous-div-f2ixfl">
  <header style="magin-bottom: 1.5rem;">...</header>
  <div data="post">
    <h1 class="css-glamorous-h1-6ksnsb">Selenium From The Ground Up: Setting Up Selenium</h1>
  </div>
```

Sweet, we see a super obvious (not planted by me identifier :]) `data="post"`. Let's write an XPath locator to grab the H1 element with the text "Selenium From The Ground Up: Setting Up Selenium" `//div[@data="post"]/h1`. The **/** slash between ..post"], and h1 denotes that we want the h1 element RIGHT after the `//div[@data="post"]` element.

# Bringing It All Together
Let's now update our test to get the text from this element and assert that the post name matches the first post under posts.

```python
# blog_test.py
import time

from selenium import webdriver

# 1. create webdriver
driver = webdriver.Chrome()

# 2. navigate to http://simpleselenium.com
driver.get('http://www.simpleselenium.com')

# 3. Get the name of the first post
first_post = driver.find_element_by_xpath('(//div[@data="post"]//h3)[1]')
first_post_name = first_post.text

# 4. click on the first post
first_post.click()
time.sleep(3)  # wait for page to load

# 5. verify that the post title matches the name saved from step 3
current_post = driver.find_element_by_xpath('//div[@data="post"]/h1')
current_post_name = current_post.text

# assert that the post name matches the name of the first post on the posts page
assert first_post_name == current_post_name, 'Expected the name of the post to be {}, instead was {}'.format(
    first_post_name,
    current_post_name
)

# 6. close webdriver
driver.close()
```

We run the program, and we see no assertion errors. Success!

If you didn't notice, I added a time.sleep(3) after we call first_post.click(). We need this to because we cannot search for the XPath until the page dom has loaded. There are better solutions and hard-coded time.sleeps are bad practice, however thats another talk for another time.

# Conclusion

There we have it. We have a working, useful test, that verifies that our website is behaving correctly! I know the post is a bit lengthy, and I didn't touch on advanced XPath locating at all, so in the future I will write another article to go in-depth on the XPath locator, and tips that i've learned working with them.

After running this program, I wasn't 100% sure that the assertion was actually working or not. So in the next article i'm going to introduce the **Unittest test framework** and re-write our existing program in the test framework as well as introduce new test cases to showcase the power of test frameworks and why you should be using them if you're not already.
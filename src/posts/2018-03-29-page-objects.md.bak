---
title: "Page Objects Simplified"
date: "2018-03-29"
---

# What is the Page Object Model (POM)?

# Variants of POM

# The Problem

# The Solution

We use our friend logic to dictate what should or shouldn't be in our Page Objects. To expand on what I mean, let's look at the Page class below. Page is a base object, and we should only include services in our base object that are used in all Page Objects. I listed just a few;
* __find_element__ - this method is great for 2 reasons. One, it creates a layer of abstraction between the webdriver (selenium) and our Page Objects. At any point in time, if a new, greater driver or library becomes open source, we just need to modify our base find_element to update all our interfaces to webdriver. Secondly, from all of our Page Objects we can call self.find_element(*locator), as opposed to self.driver.find_element(*locator. This is a subtle difference, however, we're in the business as deverlopers of wrting clean code. I chose the former everytime.
* __visit(self, url)__ - allows us to visit any page from any page (makes sense!)


```python
# page.py
class Page(object):

    def __init__(self):
        self.browser = selenium_browser

    def find_element(self, *loc):
        return self.browser.find_element(*loc)

    def visit(self, url):
        self.browser.get(url)

    def url(self):
        return self.url_string
```

Next, we define our HomePage Page Object. We define services that we can call, instead of actions.

I've often seen the mistake in writing tests like..
1. goto website https://localhost:8000
2. enter "username" into the username field
3. enter "password" intop the password field
4. press the login button
5. expect current page to be https://localhost:8000/posts

My issue with this is the sheer number of steps it takes to complete the task. We can easily abstract the steps into a service, instead of actions to login to the website.

A better example of a service oriented test arcitecture would be..
1. goto website https://localhost:8000
2. login to the website as "username" with password "password"
3. expect current page to be https://localhost:8000/posts

``` python
# home_page.py
class HomePage(Page):

    posts = (By.XPATH, '//a[contains(@class, "css-")]/h3')

    def __init__(self):
        super(HomePage, self).__init__()
    
    def posts_titles(self):
        """ Gets all the posts titles

        :return list: the list of post titles 
        """
        return [post.text for post in self.find_element(*self.posts)]

    def goto_post_by_name(self, name):
        """ Goto post by a given name

        :return bool: True if click is successful, False otherwise
        """
        posts = self.find_element(*self.posts)
        post = [post for post in posts if post.text == name][0]
        post.click()
        return Post()
```

```python
from home_page import HomePage

class HomePageTests(unittest.TestCase):

    def setUp(self):
        self.home_page = HomePage()
    
    def test_is_posts_available(self):
        self.assertTrue(len(self.home_page.posts_titles() > 1 ))

    def test_post_navigation_by_name(self):
        post = self.home_page.goto_post_by_name('Page Objects Simplified')
        self.assertTrue('/2018-03-29-page-objects' in post.url())

```

# Expounding On The Given Example
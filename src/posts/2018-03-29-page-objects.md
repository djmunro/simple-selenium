---
title: "Page Objects Simplified"
date: "2018-03-29"
---

# What is the Page Object Model (POM)?

# Variants of POM

# The Problem

# The Solution

```python
# page.py
class Page(object):

    def __init__(self):
        self.browser = selenium_browser

    def find_element(self, *loc):
        return self.browser.find_element(*loc)

    def visit(self,url):
        self.browser.get(url)

    def url(self):
        return self.url_string
```

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
        return post.click()
```

```python
from home_page import HomePage

class HomePageTests(unittest.TestCase):

    def setUp(self):
        self.home_page = HomePage()
    
    def test_is_posts_available(self):
        self.assertTrue(len(self.home_page.posts_titles() > 1 ))

    def test_post_navigation_by_name(self):
        self.home_page.goto_post_by_name('Page Objects Simplified')
        self.assertTrue('/2018-03-29-page-objects' in self.url())

```

# Expounding On The Given Example
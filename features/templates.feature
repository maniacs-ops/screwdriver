@templates
Feature: Templates

    Description about templates from screwdriver-cd/screwdriver#470

    Background:
        Is there any background to this?

    @ignore
    Scenario Outline: A template owner wants to validate their template
        Given a job-level template
        When they submit it to the API
        Then they are notified it works

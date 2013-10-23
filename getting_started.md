# Getting Started
Lazo is a node module. Installing and creating a new Lazo application is as easy as uno, dos, tres.

### Installation and Application Creation

To install Lazo execute the following command:

```shell
npm install -g lazo
```

Next create a new application:

```shell
lazo create application [target_directory/]application_directory_name
# omitting directory name will create the application directory in the cwd
```

Then start the new application:

```shell
lazo start [target_directory/]application_directory_name
```

To verify that the application is running open http://localhost:8080 in a browser. You should
see the following screen

INSERT_SCREEN_SHOT_HERE

### Creating a Weather Application
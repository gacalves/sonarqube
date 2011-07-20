/*
 * Sonar, open source software quality management tool.
 * Copyright (C) 2008-2011 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * Sonar is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * Sonar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with Sonar; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02
 */
package org.sonar.api.notifications;

import org.sonar.api.ServerExtension;

/**
 * Provides logic to deliver notification.
 * For example:
 * <ul>
 * <li>email - sends email as soon as possible</li>
 * <li>email (digest) - collects notifications and sends them together once a day</li>
 * <li>gtalk - sends a chat message as soon as possible</li>
 * </ul>
 * 
 * @since 2.10
 */
public abstract class NotificationChannel implements ServerExtension {

  /**
   * @return unique key of this channel
   */
  public String getKey() {
    return getClass().getSimpleName();
  }

  public abstract void deliver(Notification notification, String username);

  @Override
  public String toString() {
    return getKey();
  }

}
